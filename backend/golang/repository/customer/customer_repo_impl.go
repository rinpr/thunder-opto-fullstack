package repository

import (
	"context"
	"log"
	"time"

	"github.com/rinpr/api-optician/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CustomerRepoImpl struct {
	Collection *mongo.Collection
}

func NewCustomerRepoImpl(collection *mongo.Collection) CustomerRepository {
	return &CustomerRepoImpl{
		Collection: collection,
	}
}

// Create implements CustomerRepository.
func (c *CustomerRepoImpl) Create(customer models.Customer) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Set the CreatedAt and UpdatedAt fields to the current time
	now := time.Now()
	customer.CreatedAt = now
	customer.UpdatedAt = now

	_, err := c.Collection.InsertOne(ctx, customer)
	if err != nil {
		log.Printf("Error repo create: %v", err)
	}
}

// Delete implements CustomerRepository.
func (c *CustomerRepoImpl) DeleteById(rawId string) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the rawId string to a MongoDB ObjectID
	id, err := primitive.ObjectIDFromHex(rawId) // error
	if err != nil {
		log.Printf("Error repo delete Invalid ID format: %v", err)
	}

	// Convert the id to an integer if necessary, or use a different method to identify the post
	_, err = c.Collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		log.Printf("Error repo delete: %v", err)
	}
}

// FindAll implements CustomerRepository.
func (c *CustomerRepoImpl) FindAll() []models.Customer {
	// Create a context with a timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := c.Collection.Find(ctx, bson.M{})
	if err != nil {
		return nil
	}
	defer cursor.Close(ctx)

	var customers []models.Customer
	for cursor.Next(ctx) {
		var customer models.Customer
		if err := cursor.Decode(&customer); err != nil {
			return nil
		}
		customers = append(customers, customer)
	}
	if err := cursor.Err(); err != nil {
		return nil
	}
	return customers
}

// FindById implements CustomerRepository.
func (c *CustomerRepoImpl) FindById(rawId string) (customer models.Customer) {
	// Create a context with a timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the string ID to a MongoDB ObjectID
	id, err := primitive.ObjectIDFromHex(rawId)
	if err != nil {
		return customer // Return an empty customer if the ID is invalid
	}

	// Find the customer by its ID
	err = c.Collection.FindOne(ctx, bson.M{"_id": id}).Decode(&customer)
	if err != nil {
		return customer // Return an empty customer if not found
	}

	return customer
}

// FindByName implements CustomerRepository.
func (c *CustomerRepoImpl) FindByName(firstName string) (customer models.Customer) {
	panic("unimplemented")
}

// FindByPhone implements CustomerRepository.
func (c *CustomerRepoImpl) FindByPhone(phoneNo string) (customer models.Customer) {
	panic("unimplemented")
}

// Patch implements CustomerRepository.
func (c *CustomerRepoImpl) Patch(rawId string, toUpdateCustomer models.Customer) {
	// Create a context with a timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the customer ID to a MongoDB ObjectID
	id, err := primitive.ObjectIDFromHex(rawId)
	if err != nil {
		panic(err)
	}
	
	// If the customer to update has empty fields, use the existing values from the database
	var preCustomer models.Customer = c.FindById(rawId)
	if toUpdateCustomer.FirstName == "" {
		toUpdateCustomer.FirstName = preCustomer.FirstName
	}
	if toUpdateCustomer.LastName == "" {
		toUpdateCustomer.LastName = preCustomer.LastName
	}
	if toUpdateCustomer.Phone == "" {
		toUpdateCustomer.Phone = preCustomer.Phone
	}
	if toUpdateCustomer.Age == nil {
		toUpdateCustomer.Age = preCustomer.Age
	}
	if toUpdateCustomer.Sex == nil {
		toUpdateCustomer.Sex = preCustomer.Sex
	}

	// Set the UpdatedAt field to the current time
	toUpdateCustomer.UpdatedAt = time.Now()

	// Update the post in the collection
	_, err = c.Collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": toUpdateCustomer})
	if err != nil {
		panic(err)
	}
}

// Put implements CustomerRepository.
func (c *CustomerRepoImpl) Put(id string, customer models.Customer) {
	panic("unimplemented")
}
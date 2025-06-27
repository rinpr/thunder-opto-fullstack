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

type PostRepoImpl struct {
	Collection *mongo.Collection
}

func NewPostRepoImpl(collection *mongo.Collection) PostRepository {
	return &PostRepoImpl{
		Collection: collection,
	}
}

// Create implements PostRepository.
func (p *PostRepoImpl) Create(post models.Post) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Set the CreatedAt and UpdatedAt fields to the current time
	now := time.Now()
	post.CreatedAt = now
	post.UpdatedAt = now

	_, err := p.Collection.InsertOne(ctx, post)
	if err != nil {
		log.Printf("Error repo create: %v", err)
	}
}

// Delete removes a post by its ID from the MongoDB collection.
func (p *PostRepoImpl) Delete(rawId string) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the rawId string to a MongoDB ObjectID
	id, err := primitive.ObjectIDFromHex(rawId) // error
	if err != nil {
		log.Printf("Error repo delete Invalid ID format: %v", err)
	}

	// Convert the id to an integer if necessary, or use a different method to identify the post
	_, err = p.Collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		log.Printf("Error repo delete: %v", err)
	}
}

// FindAll retrieves all posts from the MongoDB collection.
// It returns a slice of Post models.
func (p *PostRepoImpl) FindAll() []models.Post {
	// Create a context with a timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := p.Collection.Find(ctx, bson.M{})
	if err != nil {
		return nil
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	for cursor.Next(ctx) {
		var post models.Post
		if err := cursor.Decode(&post); err != nil {
			return nil
		}
		posts = append(posts, post)
	}
	if err := cursor.Err(); err != nil {
		return nil
	}
	return posts
}

// FindById retrieves a post by its ID from the MongoDB collection.
// It returns the post if found, or an empty post if not found or if the ID is invalid.
func (p *PostRepoImpl) FindById(rawId string) (post models.Post) {
	// Create a context with a timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the string ID to a MongoDB ObjectID
	id, err := primitive.ObjectIDFromHex(rawId)
	if err != nil {
		return post // Return an empty post if the ID is invalid
	}

	// Find the post by its ID
	err = p.Collection.FindOne(ctx, bson.M{"_id": id}).Decode(&post)
	if err != nil {
		return post // Return an empty post if not found
	}

	return post
}

// Patch implements PostRepository.
func (p *PostRepoImpl) Patch(rawId string, toUpdatePost models.Post) {
	// Create a context with a timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the post ID to a MongoDB ObjectID
	id, err := primitive.ObjectIDFromHex(rawId)
	if err != nil {
		panic(err)
	}
	
	// If the post to update has empty fields, use the existing values from the database
	var prePost models.Post = p.FindById(rawId)
	if toUpdatePost.Title == "" {
		toUpdatePost.Title = prePost.Title
	}
	if toUpdatePost.Image == "" {
		toUpdatePost.Image = prePost.Image
	}
	if toUpdatePost.Content == "" {
		toUpdatePost.Content = prePost.Content
	}

	// Set the UpdatedAt field to the current time
	toUpdatePost.UpdatedAt = time.Now()

	// Update the post in the collection
	_, err = p.Collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": toUpdatePost})
	if err != nil {
		panic(err)
	}
}

// Put implements PostRepository.
func (p *PostRepoImpl) Put(id string, post models.Post) {
	// Create a context with a timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Convert the post ID to a MongoDB ObjectID
	Id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		panic(err)
	}

	// Set the UpdatedAt field to the current time
	post.UpdatedAt = time.Now()

	// Update the post in the collection
	_, err = p.Collection.UpdateOne(ctx, bson.M{"_id": Id}, bson.M{"$set": post})
	if err != nil {
		panic(err)
	}
}

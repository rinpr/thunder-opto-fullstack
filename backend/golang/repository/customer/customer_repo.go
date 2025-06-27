package repository

import "github.com/rinpr/api-optician/models"

type CustomerRepository interface {
	Create(customer models.Customer)
	Put(id string, customer models.Customer)
	Patch(rawId string, customer models.Customer)
	DeleteById(rawId string)
	FindById(rawId string) (customer models.Customer)
	FindByName(firstName string) (customer models.Customer)
	FindByPhone(phoneNo string) (customer models.Customer)
	FindAll() []models.Customer
}
package service

import "github.com/rinpr/api-optician/models"

type CustomerService interface {
	Create(customer models.Customer)
	Put(id string, customer models.Customer)
	Patch(id string, customer models.Customer)
	DeleteById(rawId string)
	FindById(rawId string) (customer models.Customer)
	SearchByName(firstName string) (customers []models.Customer)
	SearchByPhone(phoneNo string) (customers []models.Customer)
	FindAll() []models.Customer
}
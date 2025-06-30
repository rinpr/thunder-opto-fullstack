package service

import (
	"github.com/rinpr/api-optician/models"
	"github.com/rinpr/api-optician/repository/customer"
)

type CustomerServiceImpl struct {
	CustomerRepository repository.CustomerRepository
}

func NewCustomerServiceImpl(customerRepository repository.CustomerRepository) CustomerService {
	return &CustomerServiceImpl{
		CustomerRepository: customerRepository,
	}
}

// Create implements CustomerService.
func (c *CustomerServiceImpl) Create(customer models.Customer) {
	c.CustomerRepository.Create(customer)
}

// Delete implements CustomerService.
func (c *CustomerServiceImpl) DeleteById(rawId string) {
	c.CustomerRepository.DeleteById(rawId)
}

// FindAll implements CustomerService.
func (c *CustomerServiceImpl) FindAll() []models.Customer {
	return c.CustomerRepository.FindAll()
}

// FindById implements CustomerService.
func (c *CustomerServiceImpl) FindById(rawId string) (customer models.Customer) {
	return c.CustomerRepository.FindById(rawId)
}

// SearchByName implements CustomerService.
func (c *CustomerServiceImpl) SearchByName(name string) (customers []models.Customer) {
	return c.CustomerRepository.SearchByName(name)
}

// SearchByPhone implements CustomerService.
func (c *CustomerServiceImpl) SearchByPhone(phoneNo string) (customers []models.Customer) {
	return c.CustomerRepository.SearchByPhone(phoneNo)
}

// Patch implements CustomerService.
func (c *CustomerServiceImpl) Patch(rawId string, customer models.Customer) {
	c.CustomerRepository.Patch(rawId, customer)
}

// Put implements CustomerService.
func (c *CustomerServiceImpl) Put(id string, customer models.Customer) {
	panic("unimplemented")
}

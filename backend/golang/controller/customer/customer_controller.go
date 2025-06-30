package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/rinpr/api-optician/models"
	"github.com/rinpr/api-optician/service/customer"
)

type CustomerController struct {
	customerService service.CustomerService
}

func NewCustomerController(customerService service.CustomerService) *CustomerController {
	return &CustomerController{
		customerService: customerService,
	}
}

func (controller *CustomerController) CreateNewCustomer(c *fiber.Ctx) error {
	// Parse the request body into a Customer model
	var customer models.Customer

	// If parsing fails, return a 400 status with an error message
	if err := c.BodyParser(&customer); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.CREATE": "INVALID REQUEST BODY",
		})
	}

	// Check if the customer has a firstname and lastname
	if customer.FirstName == "" || customer.LastName == "" {
		return c.Status(400).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.CREATE": "NAME CANNOT BE EMPTY",
		})
	}

	// Create the customer using the service
	controller.customerService.Create(customer)
	c.Status(200)
	return nil
}

func (controller *CustomerController) GetAllCustomer(c *fiber.Ctx) error {
	// Fetch all customers from the service
	var customers []models.Customer = controller.customerService.FindAll()

	// If no customers are found, return a 404 status with a message
	if len(customers) < 1 {
		return c.Status(404).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.FINDALL": "NO DATA EXISTS"},
		)
	}

	// If customers are found, return them with a 200 status
	c.Status(200).JSON(customers)
	return nil
}

func (controller *CustomerController) SearchCustomer(c *fiber.Ctx) error {
	search_name := c.Query("name")
	search_phone := c.Query("phone")
	var customers []models.Customer
	// log.Println("original url: ", c.OriginalURL())
	
	if search_name != "" {
		customers = controller.customerService.SearchByName(search_name)
	} else if search_phone != "" {
		customers = controller.customerService.SearchByPhone(search_phone)
	// todo: both name and phone query
	} else {
		log.Println("error: both name and phone query are empty")
		return c.Status(400).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.SEARCH": "INVALID REQUEST BODY",
		})
	}
	// log.Println("customer: ", customers)

	c.Status(200).JSON(customers)
	return nil
}

func (controller *CustomerController) GetCustomerFromId(c *fiber.Ctx) error {
	// Extract the customer ID from the URL parameters
	id := c.Params("id")

	// If the ID is empty, return a 400 status with an error message
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.FINDBYID": "ID CANNOT BE EMPTY",
		})
	}

	// Call the service to find the customer by ID
	customer := controller.customerService.FindById(id)

	// If no customer is found, return a 404 status with a message
	if customer == (models.Customer{}) {
		return c.Status(404).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.FINDBYID": "CUSTOMER NOT FOUND",
		})
	}
	
	// If the customer is found, return it with a 200 status
	c.Status(200).JSON(customer)
	return nil
}

func (controller *CustomerController) EditCustomer(c *fiber.Ctx) error {
	// Extract the customer ID from the URL parameters
	id := c.Params("id")

	// If the ID is empty, return a 400 status with an error message
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.PATCH": "ID CANNOT BE EMPTY",
		})
	}

	// Parse the request body into a Customer model
	var customer models.Customer
	if err := c.BodyParser(&customer); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"CUSTOMERCONTROLLER.PATCH": "INVALID REQUEST BODY",
		})
	}

	// Call the service to patch the customer
	controller.customerService.Patch(id, customer)
	c.Status(200)
	return nil
}

func (controller *CustomerController) DeleteCustomerById(c *fiber.Ctx) error {
	// Extract the post ID from the URL parameters
	id := c.Params("id")

	// If the ID is empty, return a 400 status with an error message
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.DELETE": "ID CANNOT BE EMPTY",
		})
	}

	// Call the service to delete the post by ID
	controller.customerService.DeleteById(id)
	c.Status(200)
	return nil
}
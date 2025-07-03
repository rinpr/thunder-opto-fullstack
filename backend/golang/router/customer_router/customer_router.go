package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rinpr/api-optician/controller/customer"
	"github.com/rinpr/api-optician/repository/customer"
	"github.com/rinpr/api-optician/service/customer"
	"go.mongodb.org/mongo-driver/mongo"
)

var dbName = "java_rin"
var collectionName = "customers"
var collection *mongo.Collection
var customerController *controller.CustomerController

func NewCustomerRouter(router fiber.Router, client *mongo.Client) {
	// Initialize the MongoDB collection
	collection = client.Database(dbName).Collection(collectionName)

	// Initialize the Customer repository, service, and controller
	customerRepository := repository.NewCustomerRepoImpl(collection)
	customerService := service.NewCustomerServiceImpl(customerRepository)
	customerController = controller.NewCustomerController(customerService)

	customerRouter := router.Group("/customer")

	// Set up the routes and handlers
	handleReq(customerRouter)
}

func handleReq(r fiber.Router) {

	// This is just a placeholder route to test the server
	r.Get("/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	r.Post("/", customerController.CreateNewCustomer)
	r.Get("/", customerController.GetAllCustomer)
	r.Get("/search", customerController.SearchCustomer) // not optimized
	r.Get("/:id", customerController.GetCustomerFromId)
	r.Patch("/:id", customerController.EditCustomer)
	r.Delete("/:id", customerController.DeleteCustomerById)

	// r.Put("/customer/:id", customerController.Put) // unimplimented: maybe not needed
}

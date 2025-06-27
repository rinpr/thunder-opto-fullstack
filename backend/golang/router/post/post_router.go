package router

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/rinpr/api-optician/controller/post"
	"github.com/rinpr/api-optician/repository/post"
	"github.com/rinpr/api-optician/service/post"
	"go.mongodb.org/mongo-driver/mongo"
)

// private variables for database and collection names
var dbName = "test"
var collectionName = "posts"
var collection *mongo.Collection
var postController *controller.PostController

func StartPostService(client *mongo.Client) *fiber.App {
	// Create a new Fiber app and define the API group
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,PUT,PATCH,DELETE",
		AllowHeaders:     "Origin,Content-Type",
		AllowCredentials: true,
	}))
	api := app.Group("/api")

	// Initialize the MongoDB collection
	collection = client.Database(dbName).Collection(collectionName)

	// Initialize the Post repository, service, and controller
	postRepository := repository.NewPostRepoImpl(collection)
	postService := service.NewPostServiceImpl(postRepository)
	postController = controller.NewPostController(postService)

	// Set up the routes and handlers
	handleReq(api)

	app.Listen(os.Getenv("API_PORT"))
	fmt.Println("Server is running on port:", os.Getenv("API_PORT"))
	return app
}

func handleReq(r fiber.Router) {

	// This is just a placeholder route to test the server
	r.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	r.Post("/posts", postController.Create) // untested: updateAt moved from controller to repository
	r.Get("/posts", postController.FindAll)
	r.Get("/posts/:id", postController.FindById)
	r.Put("/posts/:id", postController.Put) // untested: updateAt moved from controller to repository
	r.Patch("/posts/:id", postController.Patch)
	r.Delete("/posts/:id", postController.Delete)
}

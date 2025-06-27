package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rinpr/api-optician/models"
	"github.com/rinpr/api-optician/service/post"
)

type PostController struct {
	postService service.PostService
}

func NewPostController(postService service.PostService) *PostController {
	return &PostController{
		postService: postService,
	}
}

func (controller *PostController) FindAll(c *fiber.Ctx) error {
	// Fetch all posts from the service
	var customers[] models.Post = controller.postService.FindAll()

	// If no posts are found, return a 404 status with a message
	if len(customers) < 1 {
		return c.Status(404).JSON(fiber.Map{
			"POSTCONTROLLER.FINDALL": "NO DATA EXISTS"},
		)
	}

	// If posts are found, return them with a 200 status
	c.Status(200).JSON(customers)
	return nil
}

func (controller *PostController) FindById(c *fiber.Ctx) error {
	// Extract the post ID from the URL parameters
	id := c.Params("id")

	// If the ID is empty, return a 400 status with an error message
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.FINDBYID": "ID CANNOT BE EMPTY",
		})
	}

	// Call the service to find the post by ID
	post := controller.postService.FindById(id)

	// If no post is found, return a 404 status with a message
	if post == (models.Post{}) {
		return c.Status(404).JSON(fiber.Map{
			"POSTCONTROLLER.FINDBYID": "POST NOT FOUND",
		})
	}
	
	// If the post is found, return it with a 200 status
	c.Status(200).JSON(post)
	return nil	
}

func (controller *PostController) Create(c *fiber.Ctx) error {
	// Parse the request body into a Post model
	var post models.Post

	// If parsing fails, return a 400 status with an error message
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.CREATE": "INVALID REQUEST BODY",
		})
	}

	// Check if the post has a title and content
	if post.Title == "" || post.Content == "" {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.CREATE": "TITLE AND CONTENT CANNOT BE EMPTY",
		})
	}

	// Create the post using the service
	controller.postService.Create(post)
	c.Status(200)
	return nil
}

func (controller *PostController) Delete(c *fiber.Ctx) error {
	// Extract the post ID from the URL parameters
	id := c.Params("id")

	// If the ID is empty, return a 400 status with an error message
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.DELETE": "ID CANNOT BE EMPTY",
		})
	}

	// Call the service to delete the post by ID
	controller.postService.Delete(id)
	c.Status(200)
	return nil
}

func (controller *PostController) Put(c *fiber.Ctx) error {
	// Extract the post ID from the URL parameters
	id := c.Params("id")

	// If the ID is empty, return a 400 status with an error message
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.PUT": "ID CANNOT BE EMPTY",
		})
	}

	// Parse the request body into a Post model
	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.PUT": "INVALID REQUEST BODY",
		})
	}

	// Call the service to update the post
	controller.postService.Put(id, post)
	c.Status(200)
	return nil
}

func (controller *PostController) Patch(c *fiber.Ctx) error {
	// Extract the post ID from the URL parameters
	id := c.Params("id")

	// If the ID is empty, return a 400 status with an error message
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.PATCH": "ID CANNOT BE EMPTY",
		})
	}

	// Parse the request body into a Post model
	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"POSTCONTROLLER.PATCH": "INVALID REQUEST BODY",
		})
	}

	// Call the service to patch the post
	controller.postService.Patch(id, post)
	c.Status(200)
	return nil
}
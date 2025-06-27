package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/rinpr/api-optician/database"
	"github.com/rinpr/api-optician/router/customer_router"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func main() {
	// Load environment variables and connect to the database
	loadENV()

	// Initialize the MongoDB client
	client := loadDB()

	// Set up the Fiber router and start the post service
	// router.StartPostService(client)

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,PATCH,DELETE",
		AllowHeaders:     "Origin,Content-Type",
		AllowCredentials: true,
	}))
	api := app.Group("/api")

	router.NewCustomerRouter(api, client)

	app.Listen(os.Getenv("API_PORT"))
	fmt.Println("Server is running on port:", os.Getenv("API_PORT"))
}

func loadENV() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func loadDB() (*mongo.Client) {
	client, err := database.Connect()

	if err != nil {
		log.Fatal(err)
	}

	return client
}

func getAllMongoDB(client *mongo.Client, ctx context.Context) {
	// access the database and collection
	var dbName = "test"
	var collectionName = "posts"
	collection := client.Database(dbName).Collection(collectionName)

	// Find all documents
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)

	// Iterate and pretty-print
	for cursor.Next(ctx) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			log.Fatal(err)
		}
		prettyJSON, err := json.MarshalIndent(result, "", "  ")
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(string(prettyJSON))
	}
}

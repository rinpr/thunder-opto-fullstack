package router

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

type Router interface {
	StartService(client *mongo.Client) *fiber.App
	HandleReq(r fiber.Router)
}
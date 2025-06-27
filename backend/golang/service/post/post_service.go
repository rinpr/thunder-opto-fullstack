package service

import (
	"github.com/rinpr/api-optician/models"
)

type PostService interface {
	Create(post models.Post)
	Put(id string, post models.Post)
	Patch(id string, post models.Post)
	Delete(id string)
	FindById(id string) (post models.Post)
	FindAll() []models.Post
}
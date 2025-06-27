package repository

import "github.com/rinpr/api-optician/models"

type PostRepository interface {
	Create(post models.Post)
	Put(id string, post models.Post)
	Patch(id string, post models.Post)
	Delete(id string)
	FindById(id string) (post models.Post)
	FindAll() []models.Post
}
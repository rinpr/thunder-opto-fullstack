package service

import (
	"github.com/rinpr/api-optician/models"
	"github.com/rinpr/api-optician/repository/post"
)

type PostServiceImpl struct {
	PostRepository repository.PostRepository
}

func NewPostServiceImpl(postRepository repository.PostRepository) PostService {
	return &PostServiceImpl{
		PostRepository: postRepository,
	}
}

// Create implements PostService.
func (p *PostServiceImpl) Create(post models.Post) {
	// result := p.Validate.Struct(post)
	p.PostRepository.Create(post)
}

// Delete implements PostService.
func (p *PostServiceImpl) Delete(id string) {
	p.PostRepository.Delete(id)
}

// FindAll implements PostService.
func (p *PostServiceImpl) FindAll() []models.Post {
	result := p.PostRepository.FindAll()
	return result
}

// FindById implements PostService.
func (p *PostServiceImpl) FindById(id string) (post models.Post) {
	return p.PostRepository.FindById(id)
}

// Put implements PostService.
func (p *PostServiceImpl) Put(id string, post models.Post) {
	p.PostRepository.Put(id, post)
}

// Patch implements PostService.
func (p *PostServiceImpl) Patch(id string, post models.Post) {
	p.PostRepository.Patch(id, post)
}
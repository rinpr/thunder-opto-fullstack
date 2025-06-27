package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty" required:"true"`
	Title     string             `json:"title" bson:"title" required:"true"`
	Image     string             `json:"image" bson:"image" required:"true"`
	Content   string             `json:"content" bson:"content" required:"true"`
	CreatedAt time.Time          `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt time.Time          `json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
}

package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Customer struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty" required:"true"`
	FirstName string             `json:"first_name" bson:"first_name" required:"true"`
	LastName  string             `json:"last_name" bson:"last_name" required:"true"`
	Phone     string             `json:"phone" bson:"phone" required:"true"`
	Age       *int                `json:"age" bson:"age" required:"true"`
	Sex       *bool               `json:"sex" bson:"sex" required:"true"`
	CreatedAt time.Time          `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt time.Time          `json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
}

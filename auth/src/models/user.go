package models

import (
	"main/src/config"

	"go.mongodb.org/mongo-driver/mongo"
)

type UserSchema struct {
	ID       string `json:"id,omitempty" bson:"_id,omitempty"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// var User *mongo.Collection = config.Mg.Db.Collection("user")
func GetUserCollection() *mongo.Collection {
	return config.Mg.Db.Collection("user")
}
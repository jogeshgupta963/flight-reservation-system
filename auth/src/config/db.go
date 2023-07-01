package config

import (
	"context"
	"fmt"
	"main/src/util/helper"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type mongoInstance struct {
	Client *mongo.Client
	Db     *mongo.Database
}

var Mg mongoInstance





func ConnectDB() error {
	dbName := os.Getenv("DB_NAME")
	var mongoURI = os.Getenv("MONGO_URI")
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURI))

	helper.ErrorPanic(err)
	db := client.Database(dbName)
	Mg = mongoInstance{
		Client: client,
		Db: db,
	}
	fmt.Println("DB CONNECTED")
	return nil
}

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
var dbName = os.Getenv("DB_NAME")
// var mongoURI = os.Getenv("MONGO_URI");

var mongoURI = "mongodb+srv://admin:FYv5jqnidHPCxCOr@testing.s5sej.mongodb.net/"+dbName+"?retryWrites=true&w=majority"


func ConnectDB() error {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURI))
	fmt.Println("ello",os.Getenv("MONGO_URI"))

	helper.ErrorPanic(err)
	db := client.Database(dbName)
	Mg = mongoInstance{
		Client: client,
		Db: db,
	}
	fmt.Println("DB CONNECTED")
	return nil
}

package config

import (
	"log"
	"main/src/util/helper"
	"os"

	"github.com/joho/godotenv"
)

func Init(){
	err := godotenv.Load()
	helper.ErrorPanic(err)
	log.Println("Env Loaded...")
}

var Config = map[string]string{
    "PORT": os.Getenv("PORT"),
    "NODE_ENV": os.Getenv("NODE_ENV"),
    "COOKIE_NAME": os.Getenv("COOKIE_NAME"),
    "JWT_SECRET": os.Getenv("JWT_SECRET"),
    "JWT_EXPIRATION": os.Getenv("JWT_EXPIRATION"),
    "MONGO_URI": os.Getenv("MONGO_URI"),
    "DB_NAME": os.Getenv("DB_NAME"),
};


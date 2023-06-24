package main

import (
	"fmt"
	"log"
	"main/src/config"
	"main/src/util/helper"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func init(){
	err := godotenv.Load()
	helper.ErrorPanic(err)
	log.Println("Env Loaded...")
}
func main() {
	
	app := fiber.New()
	 
	app.Get("/",func(c *fiber.Ctx) error{
		return c.SendString("Index Page")
	})
	fmt.Println("ello",os.Getenv("MONGO_URI"))
	config.ConnectDB()

	app.Listen(os.Getenv("PORT"))
}
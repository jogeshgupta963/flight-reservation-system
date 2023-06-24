package main

import (
	"fmt"
	"log"
	"main/src/routes"
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
	routes.Setup(app)
	app.Get("/",func(c *fiber.Ctx) error{
		return c.SendString("Index Page")
	})
	
	// config.ConnectDB()
	
	app.Listen(":"+os.Getenv("PORT"))
	fmt.Println("Server Started on ",os.Getenv("PORT"))
}
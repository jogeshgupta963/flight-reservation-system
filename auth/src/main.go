package main

import (
	"fmt"
	"main/src/config"
	"main/src/routes"
	"os"

	"github.com/gofiber/fiber/v2"
)

// func init(){
// 	err := godotenv.Load()
// 	helper.ErrorPanic(err)
// 	log.Println("Env Loaded...")
// }
func main() {
	config.Init()
	config.ConnectDB();
	
	app := fiber.New()
	routes.Setup(app)
	app.Get("/",func(c *fiber.Ctx) error{
		return c.SendString("Index Page")
	})
	
	
	app.Listen(":"+os.Getenv("PORT"))
	fmt.Println("Server Started on ",os.Getenv("PORT"))
}
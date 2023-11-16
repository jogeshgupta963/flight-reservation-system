package routes

import (
	"main/src/controllers"

	"github.com/gofiber/fiber/v2"
)


func Setup(app *fiber.App) {
	api := app.Group("/api/auth")
	api.Post("/login", controllers.Login)
	api.Post("/register",controllers.Register)
}
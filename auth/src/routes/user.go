package routes

import (
	"main/src/controllers"

	"github.com/gofiber/fiber/v2"
)





func Setup(app *fiber.App) {
	app.Post("/api/auth/login", controllers.Login)
}
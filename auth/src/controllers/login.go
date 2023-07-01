package controllers

import (
	"main/src/models"
	"main/src/util/helper"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *fiber.Ctx) error{

	User := models.GetUserCollection();
	//pull my req.body
	data := new(models.UserSchema) 
	err := c.BodyParser(&data)
	if err!= nil {
		return c.Status(400).JSON(fiber.Map{
			"success":false,
			"data": "Invalid POST request",
		})
	}
	//check for pass and email in body

	if data.Password == "" || data.Email == "" {
		return c.Status(400).JSON(fiber.Map{
			"success":false,
			"data": "Invalid Password or Email",
		})
	}

	var user models.UserSchema
	query := bson.D{{
		Key:"email",
		Value:data.Email,
	}}
	res := User.FindOne(c.Context(),query)
	err = res.Decode(&user)

	if(err != nil){
		return c.Status(500).JSON(fiber.Map{
			"success":false,
			"data": "Internal Server Error",
		})
	}
	//match hashed pass
	err = bcrypt.CompareHashAndPassword([]byte(user.Password),[]byte(data.Password))
	if(err != nil){
		// helper.ErrorPanic(err)
		return c.Status(500).JSON(fiber.Map{
			"success":false,
			"data": "Invalid Password or Email",
		})
	}
	// create JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
		"email":user.Email,
		"id":user.ID,
	})
	tokenString,err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	helper.ErrorPanic(err)
	if(err!=nil){
		return c.Status(500).JSON(fiber.Map{
			"success":false,
			"data": "Internal Server Error",
		})
	}
	
	expiration,_ := time.ParseDuration(os.Getenv("JWT_EXPIRATION"))
	c.Cookie(&fiber.Cookie{
		Name:os.Getenv("COOKIE_NAME"),
		Value: tokenString,
		HTTPOnly: true,
		Expires: time.Now().Add(expiration),
	})
	//create cookie
	return c.Status(200).JSON(fiber.Map{
		"success":true,
		"data":user,
	})
}
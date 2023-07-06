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

func Register(c *fiber.Ctx) error {
	User := models.GetUserCollection()

	// pull req.body and validate data
	body := new(models.UserSchema);
	err := c.BodyParser(body)
	if(err != nil || body.Name=="" || body.Email=="" || body.Password ==""){
		helper.ErrorPanic(err)
		return c.Status(401).JSON(fiber.Map{
			"success":false,
			"data":"Name, email or password is required",
		})
	}

	// search for duplicate user
	var user models.UserSchema
	query := bson.M{"email":body.Email}
		
	 res := User.FindOne(c.Context(),query)
	 err = res.Decode(&user)

	
	if (err == nil) {
		return c.Status(401).JSON(fiber.Map{
			"success":"false",
			"data":"User Already Exists",
		})
	}
	// // hash password
		
	password,_ := bcrypt.GenerateFromPassword([]byte(body.Password),bcrypt.DefaultCost);
	body.Password = string(password)
	//create user
	body.ID = "";
	resp,err := User.InsertOne(c.Context(),body)
	
	if(err != nil){
		return c.Status(500).JSON(fiber.Map{
			"success":false,
			"data":"Internal Server Error",
		})
	}
	// // get user
		res = User.FindOne(c.Context(),bson.D{{
			Key: "_id",
			Value:resp.InsertedID,
		}})
		res.Decode(&user)
	// //jwt creation

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
		"email" :body.Email,
		"id":resp.InsertedID,
	})

	tokenString,err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	helper.ErrorPanic(err)
	if(err!=nil){
		return c.Status(500).JSON(fiber.Map{
			"success":false,
			"data": "Internal Server Error",
		})
	}
	//create cookie
	expiration,_ := time.ParseDuration(os.Getenv("JWT_EXPIRATION"))
	c.Cookie(&fiber.Cookie{
		Name:os.Getenv("COOKIE_NAME"),
		Value: tokenString,
		// HTTPOnly: true,
		Expires: time.Now().Add(expiration),
		Secure: false,
	})
	return c.Status(200).JSON(fiber.Map{
		"success":true,
		"data":user,
		"token":tokenString,
	})

}
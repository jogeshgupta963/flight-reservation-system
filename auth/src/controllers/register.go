package controllers

import (
	"encoding/hex"
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
	User := models.GetCollection("user")

	// pull req.body and validate data
	var body map[string]string;
	err := c.BodyParser(&body)
	if(err != nil || body["name"]=="" || body["email"]=="" || body["password"] ==""){
		helper.ErrorPanic(err)
		return c.Status(401).JSON(fiber.Map{
			"success":false,
			"data":"Name, email or password is required",
		})
	}

	// search for duplicate user
	var user models.UserSchema
	query := bson.D{{
		Key:"email",
		Value:body["email"],
	}}
	
	res := User.FindOne(c.Context(),query);
	err = res.Decode(&user)

	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"success":"false",
			"data":"User Already Exists",
		})

	}
	// hash password
		
	password,_ := bcrypt.GenerateFromPassword([]byte(body["password"]),bcrypt.DefaultCost);
	body["password"] = hex.EncodeToString(password)
	//create user
	body["ID"] = "";
	resp,err := User.InsertOne(c.Context(),body)
	
	if(err != nil){
		return c.Status(500).JSON(fiber.Map{
			"success":false,
			"data":"Internal Server Error",
		})
	}
	// get user
		res = User.FindOne(c.Context(),bson.D{{
			Key: "_id",
			Value:resp.InsertedID,
		}})
		res.Decode(&user)
	//jwt creation

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
		"email" :body["email"],
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
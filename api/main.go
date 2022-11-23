package main

import (
	"plugno-api/auth"
	"plugno-api/db"
	"plugno-api/models"
	"plugno-api/structs"

	"github.com/gin-gonic/gin"
)

func main() {
	conn := db.Open()
	router := gin.Default()

	server := &structs.Server{
		DB:        conn,
		UserModel: models.UserModel{DB: conn},
	}

	// AUTH
	a := auth.NewAuthHandler(server)

	router.POST("/register", a.RegisterUser)

	router.Run()
}

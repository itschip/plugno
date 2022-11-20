package main

import (
	"plugno-api/auth"
	"plugno-api/db"

	"github.com/gin-gonic/gin"
)

func main() {
	conn := db.Open()
	router := gin.Default()

	// AUTH
	a := auth.NewAuthHandler(conn)

	router.POST("/register", a.RegisterUser)

	router.Run()
}

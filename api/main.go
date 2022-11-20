package main

import (
	"plugno-api/auth"
	"plugno-api/db"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/register", auth.HandleRegister)

	db.Open()
	router.Run()
}

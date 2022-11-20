package main

import (
	"plugno-api/auth"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/register", auth.HandleRegister)

	router.Run()
}

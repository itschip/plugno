package main

import (
	"plugno-api/auth"
	"plugno-api/db"
	"plugno-api/models"
	"plugno-api/structs"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	conn := db.Open()
	router := gin.Default()

	CORSHandler := cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})

	router.Use(CORSHandler)

	server := &structs.Server{
		DB:        conn,
		UserModel: models.UserModel{DB: conn},
	}

	// AUTH
	a := auth.NewAuthHandler(server)

	router.POST("/register", a.RegisterUser)

	router.Run(":6001")
}

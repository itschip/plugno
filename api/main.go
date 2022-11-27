package main

import (
	"plugno-api/auth"
	"plugno-api/db"
	"plugno-api/models"
	"plugno-api/post"
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
	authorized := router.Group("/")

	server := &structs.Server{
		UserModel: models.UserModel{DB: conn},
		PostModel: models.PostModel{DB: conn},
	}

	a := auth.NewAuthHandler(server)
	p := post.NewPostHandler(server)

	router.POST("/register", a.RegisterUser)
	router.GET("/user", a.User)

	authorized.Use(auth.Authorized())
	{
		authorized.GET("/post/new", p.New)
	}

	router.Run(":6001")
}

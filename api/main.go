package main

import (
	"plugno-api/auth"
	"plugno-api/db"
	"plugno-api/jobs"
	"plugno-api/models"
	"plugno-api/structs"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	conn := db.Open()

	server := &structs.Server{
		UserModel: models.UserModel{DB: conn},
		JobModel:  models.JobModel{DB: conn},
	}
	authHandler := auth.NewAuthHandler(server)
	jobsHandler := jobs.NewJobsHandler(server)

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

	router.POST("/register", authHandler.RegisterUser)
	router.POST("/login", authHandler.Login)
	router.GET("/user", authHandler.User)

	authorized.Use(auth.Authorized())
	{
		authorized.POST("/jobs/new", jobsHandler.New)
		router.GET("/jobs/getOne", jobsHandler.GetOne)
		router.GET("/jobs/getAll", jobsHandler.GetAll)
	}

	router.Run(":6001")
}

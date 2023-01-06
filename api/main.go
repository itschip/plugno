package main

import (
	"plugno-api/auth"
	"plugno-api/chat"
	"plugno-api/db"
	"plugno-api/jobs"
	"plugno-api/models"
	"plugno-api/profile"
	"plugno-api/structs"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	conn := db.Open()

	server := structs.Server{
		UserModel:    models.UserModel{DB: conn},
		JobModel:     models.JobModel{DB: conn},
		MessageModel: models.MessageModel{DB: conn},
		ProfileModel: models.ProfileModel{DB: conn},
	}

	authHandler := auth.NewAuthHandler(&server)
	jobsHandler := jobs.NewJobsHandler(&server)
	chatHandler := chat.NewChatHandler(&server)
	profileHandler := profile.NewProfileHandler(&server)

	_chat := chat.NewChat()
	go _chat.Run()

	_tracking := jobs.NewTracking()
	go _tracking.RunTracking()

	router := gin.Default()

	CORSHandler := cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})

	router.Use(CORSHandler)

	router.POST("/register", authHandler.RegisterUser)
	router.POST("/login", authHandler.Login)
	router.GET("/user", authHandler.User)

	router.GET("/ws/:roomId", func(ctx *gin.Context) {
		chatHandler.ServeWs(_chat, ctx)
	})
	router.GET("/jobs/tracking", func(ctx *gin.Context) {
		jobsHandler.ServeTracker(_tracking, ctx)
	})

	router.GET("/profile/get", profileHandler.Get)

	router.GET("/jobs/getAll", jobsHandler.GetAll)
	router.POST("/jobs/newPlugJob", jobsHandler.NewPlugJob)
	router.GET("/jobs/findPlugJobs", jobsHandler.GetAllPlugJobs)
	router.GET("/jobs/getActiveJob", jobsHandler.GetActiveJob)

	router.POST("/plugs/acceptJob", jobsHandler.AcceptPlugJob)

	router.GET("/conversations/getAll", chatHandler.FindConversations)
	router.GET("/messages/getAll", chatHandler.FindMessages)

	authorized := router.Group("/")
	authorized.Use(auth.Authorized())
	{
		authorized.POST("/jobs/new", jobsHandler.New)
		authorized.GET("/jobs/getOne", jobsHandler.GetOne)
	}

	router.Run(":6001")
}

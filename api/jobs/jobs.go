package jobs

import (
	"fmt"
	"log"
	"net/http"
	"plugno-api/models"
	"plugno-api/structs"
	"strconv"

	"github.com/gin-gonic/gin"
)

type JobReq struct {
	Title            string `json:"title"`
	ShortDescription string `json:"shortDescription"`
	Description      string `json:"description"`
	AskingPrice      int    `json:"askingPrice"`
	UserID           int    `json:"userId"`
}

type JobsHandler struct {
	jobModel models.JobModel
}

func NewJobsHandler(s *structs.Server) *JobsHandler {
	return &JobsHandler{
		jobModel: s.JobModel,
	}
}

func (handler *JobsHandler) New(c *gin.Context) {
	var jobReq JobReq
	err := c.ShouldBindJSON(&jobReq)
	if err != nil {
		log.Println(err.Error())
		c.Writer.WriteHeader(http.StatusBadRequest)
		return
	}

	jobObject := models.JobObject{
		Title:            jobReq.Title,
		Description:      jobReq.Description,
		ShortDescription: jobReq.ShortDescription,
		UserID:           jobReq.UserID,
		AskingPrice:      jobReq.AskingPrice,
	}

	handler.jobModel.Create(&jobObject)

	c.JSON(200, "Created job")
}

func (handler *JobsHandler) NewPlugJob(ctx *gin.Context) {
	var plugJobReq models.PlugJobObject

	err := ctx.ShouldBindJSON(&plugJobReq)
	if err != nil {
		log.Println(err.Error())
		ctx.Writer.WriteHeader(http.StatusBadRequest)
		return
	}

	handler.jobModel.CreatePlugJob(&plugJobReq)
}

func (handler *JobsHandler) GetAll(c *gin.Context) {
	jobs := handler.jobModel.FindAll()

	c.JSON(200, jobs)
}

func (handler *JobsHandler) GetOne(c *gin.Context) {
	jobId := c.Query("id")
	id, err := strconv.ParseInt(jobId, 0, 8)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	job, err := handler.jobModel.FindOne(id)

	c.JSON(200, job)
}

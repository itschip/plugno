package jobs

import (
	"fmt"
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
	var err error
	var jobReq JobReq
	err = c.ShouldBindJSON(&jobReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Missing fields to create job")
		return
	}

	jobObject := models.JobObject{
		Title:            jobReq.Title,
		Description:      jobReq.Description,
		ShortDescription: jobReq.ShortDescription,
		UserID:           jobReq.UserID,
		AskingPrice:      jobReq.AskingPrice,
	}

	err = handler.jobModel.Create(&jobObject)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to create job")
		return
	}

	c.JSON(200, "Created job")
}

func (handler *JobsHandler) GetAll(c *gin.Context) {
	jobs, err := handler.jobModel.FindAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to find jobs")
		return
	}

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
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to find job")
		return
	}

	c.JSON(200, job)
}

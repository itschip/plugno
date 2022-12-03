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

func (jh *JobsHandler) New(c *gin.Context) {
	var jobReq JobReq
	err := c.ShouldBindJSON(&jobReq)
	if err != nil {
		log.Println(err.Error())
		c.Writer.WriteHeader(http.StatusBadRequest)
	}

	fmt.Printf("New job post:\n %v", jobReq)

	jobObject := &models.JobObject{
		Title:            jobReq.Title,
		Description:      jobReq.Description,
		ShortDescription: jobReq.ShortDescription,
		UserID:           jobReq.UserID,
		AskingPrice:      jobReq.AskingPrice,
	}

	jh.jobModel.Create(jobObject)

	c.JSON(200, "Created job")
}

func (jh *JobsHandler) GetAll(c *gin.Context) {
	jobs := jh.jobModel.FindAll()

	c.JSON(200, jobs)
}

func (jh *JobsHandler) GetOne(c *gin.Context) {
	jobId := c.Query("id")
	id, err := strconv.ParseInt(jobId, 0, 8)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	job, err := jh.jobModel.FindOne(id)

	c.JSON(200, job)
}

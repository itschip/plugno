package jobs

import (
	"fmt"
	"log"
	"plugno-api/models"
	"plugno-api/structs"
	"strconv"

	"github.com/gin-gonic/gin"
)

type JobsHandler struct {
	jobModel models.JobModel
}

func NewJobsHandler(s *structs.Server) *JobsHandler {
	return &JobsHandler{
		jobModel: s.JobModel,
	}
}

func (jh *JobsHandler) New(c *gin.Context) {
	var postReq models.Job
	err := c.ShouldBindJSON(&postReq)
	if err != nil {
		log.Println(err.Error())
	}
}

func (jh *JobsHandler) GetAll(c *gin.Context) {
	jobs := jh.jobModel.FindAll()

	fmt.Println("JOBS:\n", jobs)

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

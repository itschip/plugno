package jobs

import (
	"fmt"
	"log"
	"plugno-api/models"
	"plugno-api/structs"

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

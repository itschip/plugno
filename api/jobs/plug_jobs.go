package jobs

import (
	"fmt"
	"log"
	"net/http"
	"plugno-api/auth"
	"plugno-api/models"

	"github.com/gin-gonic/gin"
)

func (handler *JobsHandler) NewPlugJob(ctx *gin.Context) {
	var plugJobReq models.NewPlugJobObject

	err := ctx.ShouldBindJSON(&plugJobReq)
	if err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusBadRequest, fmt.Sprintf("Failed to create plug job. Error:  %s", err.Error()))
		return
	}

	fmt.Println(plugJobReq)

	err = handler.jobModel.CreatePlugJob(&plugJobReq)
	if err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusInternalServerError, "Failed to create plug job")
		return
	}

	ctx.JSON(http.StatusOK, map[string]bool{
		"isSuccess": true,
	})
}

func (handler *JobsHandler) GetAllPlugJobs(ctx *gin.Context) {
	cookie, err := auth.GetTokenFromRequest(ctx)
	if err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusInternalServerError, "Failed to find plug jobs")
		return
	}

	claims := auth.GetUserFromCookie(cookie)

	plugJobs, err := handler.jobModel.FindAllPlugJobs(claims.ID)
	if err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusInternalServerError, "Failed to find plug jobs")
		return
	}

	ctx.JSON(http.StatusOK, plugJobs)
}

func (handler *JobsHandler) AcceptPlugJob(ctx *gin.Context) {
	var jobAcceptObject models.PlugAcceptObject

	err := ctx.ShouldBindJSON(&jobAcceptObject)
	if err != nil {
		log.Println(err.Error())

		ctx.JSON(http.StatusBadRequest, "Missing fields for accepting plug job")
		return
	}

	err = handler.jobModel.CreateAcceptedPlugJob(&jobAcceptObject)
	if err != nil {
		log.Println(err.Error())

		ctx.JSON(http.StatusInternalServerError, "Failed to accept plug job")
		return
	}

	// TODO: Send push notification to user that plug job has been accepted

	ctx.JSON(http.StatusOK, nil)
}

func (handler *JobsHandler) GetAllAcceptedJobs(ctx *gin.Context) {
	cookie, err := auth.GetTokenFromRequest(ctx)
	if err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusUnauthorized, "Failed to find token")
		return
	}

	claims := auth.GetUserFromCookie(cookie)

	plugJobs, err := handler.jobModel.FindAllAcceptedJobs(claims.ID)
	if err != nil {
		log.Println(err.Error())
		ctx.JSON(http.StatusInternalServerError, "Failed to find accepted plug jobs")
		return
	}

	ctx.JSON(http.StatusOK, plugJobs)
}

func (handler *JobsHandler) GetActiveJob(ctx *gin.Context) {
	activeJob, err := handler.jobModel.GetActiveJob(1)
	if err != nil {
		log.Println(err.Error())
		ctx.JSON(500, "Failed to get active job")
	}

	ctx.JSON(200, activeJob)
}

func (handler *JobsHandler) GetActiveJobStatus() {
}

func (handler *JobsHandler) UpdateActiveJob(ctx *gin.Context) {
}

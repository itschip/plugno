package jobs

import (
	"log"
	"net/http"
	"plugno-api/auth"
	"plugno-api/models"

	"github.com/gin-gonic/gin"
)

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

func (handler *JobsHandler) GetAllPlugJobs(ctx *gin.Context) {
	cookie, err := ctx.Cookie("token")
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

	ctx.JSON(200, plugJobs)
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

	ctx.JSON(200, nil)
}

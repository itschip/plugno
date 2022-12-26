package structs

import (
	"plugno-api/models"
)

type Server struct {
	UserModel    models.UserModel
	JobModel     models.JobModel
	MessageModel models.MessageModel
	ProfileModel models.ProfileModel
}

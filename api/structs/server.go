package structs

import (
	"plugno-api/models"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

type Server struct {
	UserModel    models.UserModel
	JobModel     models.JobModel
	MessageModel models.MessageModel
	ProfileModel models.ProfileModel
	ClerkClient  clerk.Client
}

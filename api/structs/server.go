package structs

import (
	"database/sql"
	"plugno-api/models"

	"github.com/gin-gonic/gin"
)

type Server struct {
	DB        *sql.DB
	Router    *gin.Engine
	UserModel models.UserModel
}

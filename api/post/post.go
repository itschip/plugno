package post

import (
	"plugno-api/models"
	"plugno-api/structs"

	"github.com/gin-gonic/gin"
)

type PostHandler struct {
	postModel models.PostModel
}

func NewPostHandler(s *structs.Server) *PostHandler {
	return &PostHandler{
		postModel: s.PostModel,
	}
}

func (post *PostHandler) New(c *gin.Context) {
}

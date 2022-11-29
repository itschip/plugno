package post

import (
	"log"
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

func (ph *PostHandler) New(c *gin.Context) {
	var postReq models.Post
	err := c.ShouldBindJSON(&postReq)
	if err != nil {
		log.Println(err.Error())
	}

	ph.postModel.Create(&postReq)
}

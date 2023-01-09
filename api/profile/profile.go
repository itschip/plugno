package profile

import (
	"net/http"
	"plugno-api/models"
	"plugno-api/structs"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ProfileHandler struct {
	profileModel models.ProfileModel
}

func NewProfileHandler(s *structs.Server) *ProfileHandler {
	return &ProfileHandler{
		profileModel: s.ProfileModel,
	}
}

func (handler *ProfileHandler) Get(c *gin.Context) {
	profileId := c.Query("profileId")
	if profileId != "" {
		c.JSON(http.StatusBadRequest, "Missing profile ID.")
	}

	pId, err := strconv.ParseInt(profileId, 0, 8)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to fetch profile.")
	}

	profile, err := handler.profileModel.FindOne(pId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to get profile.")
	}

	c.JSON(http.StatusOK, profile)
}

func (handler *ProfileHandler) Update(c *gin.Context) {
}

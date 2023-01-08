package tracking

import (
	"plugno-api/models"
	"plugno-api/structs"
)

type TrackingHandler struct {
	jobModel models.JobModel
}

func NewTrackingHandler(s *structs.Server) *TrackingHandler {
	return &TrackingHandler{
		jobModel: s.JobModel,
	}
}

package models

import (
	"database/sql"
	"log"
)

type Profile struct {
	ID          int      `json:"id"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
}

type ProfileModel struct {
	DB *sql.DB
}

func (model *ProfileModel) FindOne(userId int64) (*Profile, error) {
	var profile Profile
	row := model.DB.QueryRow("SELECT id, description, tags FROM profile WHERE user_id = ?", userId)

	err := row.Scan(&profile.ID, &profile.Description, &profile.Tags)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}

	return &profile, nil
}

package models

import (
	"database/sql"
	"log"
)

type User struct {
	ID       int
	Username string
	Email    string
}

type UserModel struct {
	DB *sql.DB
}

func (um *UserModel) GetUserFromEmail(email string) User {
	var user User

	query := "SELECT id, username, email  FROM users WHERE email = ?"
	err := um.DB.QueryRow(query, email).Scan(&user.ID, &user.Username, &user.Email)
	if err != nil {
		log.Println(err.Error())
	}

	return user
}

package models

import (
	"database/sql"
	"log"
)

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
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

func (um *UserModel) GetUser(id int) User {
	var user User
	query := "SELECT id, username, email FROM WHERE id = ?"
	err := um.DB.QueryRow(query, id).Scan(&user.ID, &user.Username, &user.Email)
	if err != nil {
		log.Println(err.Error())
	}

	return user
}

func (um *UserModel) CreateUser(username string, email string, password string) (User, error) {
	query := "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
	_, err := um.DB.Exec(query, username, email, password)
	if err != nil {
		return User{}, err
	}

	user := um.GetUserFromEmail(email)
	if err != nil {
		return User{}, err
	}

	return user, nil
}

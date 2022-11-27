package models

import "database/sql"

type Post struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
	Content     string `json:"content"`
	Description string `json:"description"`
}

type PostModel struct {
	DB *sql.DB
}

package models

import "database/sql"

type Post struct {
	ID               int    `json:"id"`
	Title            string `json:"title"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
	Content          string `json:"content"`
	Description      string `json:"description"`
	UserID           string `json:"userId"`
	AskingPrice      int64  `json:"askingPrice"`
	Location         string `json:"location"`
	ShippingLocation `json:"shippingLocation"`
}

type ShippingLocation struct {
	From string `json:"from"`
	To   string `json:"to"`
}

type PostModel struct {
	DB *sql.DB
}

func (pm *PostModel) Create(post *Post) {
}

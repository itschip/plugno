package models

import (
	"database/sql"
	"log"
)

type Message struct {
	ID        int    `json:"id"`
	Message   string `json:"message"`
	UserID    int    `json:"userId"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type MessageModel struct {
	DB *sql.DB
}

func (mm *MessageModel) Create(message string, userId int) (int64, error) {
	query := `INSERT INTO messages (message, user_id) VALUES (?, ?)`

	result, err := mm.DB.Exec(query, message, userId)
	if err != nil {
		return 0, err
	}

	insertId, _ := result.LastInsertId()
	return insertId, nil
}

func (mm *MessageModel) FindOne(messageId int64) (Message, error) {
	var message Message
	query := `SELECT messages.id, messages.message, user_id as userId, created_at as createdAt FROM messages WHERE messages.id = ?`

	err := mm.DB.QueryRow(query, messageId).Scan(&message.ID, &message.Message, &message.UserID, &message.CreatedAt)
	if err != nil {
		log.Println(err.Error())
		return Message{}, nil
	}

	return message, nil
}

func (mm *MessageModel) FindAll(conversationId int64) ([]Message, error) {
	query := `SELECT messages.id, messages.message, user_id as userId, created_at as createdAt FROM messages`

	res, err := mm.DB.Query(query)
	defer res.Close()
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}

	messages := []Message{}
	for res.Next() {
		var message Message
		err := res.Scan(&message.ID, &message.Message, &message.UserID, &message.CreatedAt)
		if err != nil {
			log.Println(err.Error())
			return nil, err
		}

		messages = append(messages, message)
	}

	return messages, nil
}

func (mm *MessageModel) FindAllConversations() string {
	return "hello"
}

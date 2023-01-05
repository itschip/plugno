package models

import (
	"context"
	"database/sql"
	"log"
	"sort"
)

type Conversation struct {
	ID            int    `json:"id"`
	LastMessageID int    `json:"lastMessageId"`
	CreatedAt     string `json:"createdAt"`
	Username      string `json:"username"`
	Avatar        string `json:"avatar"`
	JobID         int    `json:"jobId"`
	JobTitle      string `json:"jobTitle"`
}

type ConversationParticipant struct {
	ID             int `json:"id"`
	ConversationID int `json:"conversationId"`
	UserID         int `json:"userId"`
}

type Message struct {
	ID             int    `json:"id"`
	Message        string `json:"message"`
	UserID         int    `json:"userId"`
	ConversationID int    `json:"conversationId"`
	CreatedAt      string `json:"createdAt"`
	UpdatedAt      string `json:"updatedAt"`
}

type MessageModel struct {
	DB *sql.DB
}

func (mm *MessageModel) Create(message string, userId int, conversationId int) (int64, error) {
	query := `INSERT INTO messages (message, user_id, conversation_id) VALUES (?, ?, ?)`

	result, err := mm.DB.Exec(query, message, userId, conversationId)
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

func (mm *MessageModel) FindAllMessages(conversationId int64) ([]Message, error) {
	query := `SELECT messages.id, messages.message, user_id as userId, created_at as createdAt FROM messages WHERE conversation_id = ?`

	res, err := mm.DB.Query(query, conversationId)
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

func (model *MessageModel) CreateConversation(conversationList []string) {
	var err error
	ctx := context.Background()

	queryConversation := `INSERT INTO conversations (conversation_list) VALUES (?)`
	queryParticipant := `INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?)`

	tx, err := model.DB.BeginTx(ctx, nil)
	if err != nil {
		log.Println(err.Error())
	}

	sort.Strings(conversationList)
	_, err = tx.ExecContext(ctx, queryConversation, conversationList)
	if err != nil {
		log.Println(err.Error())

		tx.Rollback()
		return
	}

	for participant := range conversationList {
		_, err = tx.ExecContext(ctx, queryParticipant, participant)
		if err != nil {
			log.Println(err.Error())

			tx.Rollback()
			return
		}
	}

	err = tx.Commit()
	if err != nil {
		log.Println(err.Error())

		tx.Rollback()
		return
	}
}

func (mm *MessageModel) FindAllConversations(userId int) ([]Conversation, error) {
	query := `select c.id, c.last_message_id, c.createdAt, u.username, u.avatar, j.id, j.title
                from conversations c
                join conversation_participants cp on c.id = cp.conversation_id
                join users u on cp.user_id = u.id
                join jobs j on c.job_id = j.id
            where cp.user_id != ? and exists(select * from conversation_participants where user_id = ? and conversation_id = c.id)`

	res, err := mm.DB.Query(query, userId, userId)
	defer res.Close()

	if err != nil {
		log.Println(err.Error())
		return nil, err
	}

	conversations := []Conversation{}
	for res.Next() {
		var conversation Conversation
		err := res.Scan(&conversation.ID, &conversation.LastMessageID, &conversation.CreatedAt, &conversation.Username, &conversation.Avatar, &conversation.JobID, &conversation.JobTitle)
		if err != nil {
			log.Println(err.Error())
			return nil, err
		}

		conversations = append(conversations, conversation)
	}

	return conversations, nil
}

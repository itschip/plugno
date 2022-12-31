package chat

import (
	"log"
	"plugno-api/auth"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (ch *ChatHandler) FindConversations(g *gin.Context) {
	cookie, err := g.Cookie("token")
	if err != nil {
		log.Println(err.Error())
	}

	claims := auth.GetUserFromCookie(cookie)

	conversations, err := ch.messageModel.FindAllConversations(claims.ID)
	if err != nil {
		log.Println(err.Error())
		g.JSON(500, "Failed to get conversation")
		return
	}

	g.JSON(200, conversations)
}

func (ch *ChatHandler) FindMessages(g *gin.Context) {
	param := g.Query("conversationId")

	if param == "" {
		g.JSON(400, "Failed to fetch messsages. Missing conversation id")
		return
	}

	convoId, err := strconv.ParseInt(param, 0, 8)
	if err != nil {
		log.Println(err.Error())
	}

	messages, err := ch.messageModel.FindAllMessages(convoId)
	if err != nil {
		log.Println(err.Error())
	}

	g.JSON(200, messages)
}

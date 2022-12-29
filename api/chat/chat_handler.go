package chat

import (
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (ch *ChatHandler) FindConversations(g *gin.Context) {
	conversations := ch.messageModel.FindAllConversations()

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

	messages, err := ch.messageModel.FindAll(convoId)
	if err != nil {
		log.Println(err.Error())
	}

	g.JSON(200, messages)
}

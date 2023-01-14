package chat

import (
	"log"
	"net/http"
	"plugno-api/auth"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (ch *ChatHandler) FindConversations(g *gin.Context) {
	cookie, err := auth.GetTokenFromRequest(g)
	if err != nil {
		log.Println(err.Error())
		g.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	claims := auth.GetUserFromCookie(cookie)

	conversations, err := ch.messageModel.FindAllConversations(claims.ID)
	if err != nil {
		log.Println(err.Error())
		g.JSON(http.StatusInternalServerError, "Failed to get conversation")
		return
	}

	g.JSON(http.StatusOK, conversations)
}

func (ch *ChatHandler) FindMessages(g *gin.Context) {
	param := g.Query("conversationId")

	if param == "" {
		g.JSON(http.StatusBadRequest, "Failed to fetch messsages. Missing conversation id")
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

	g.JSON(http.StatusOK, messages)
}

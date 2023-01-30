package chat

import (
	"log"
	"net/http"
	"plugno-api/auth"
	_clerk "plugno-api/clerk"
	"strconv"

	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/gin-gonic/gin"
)

func (ch *ChatHandler) FindConversations(g *gin.Context) {
	cookie, err := auth.GetTokenFromRequest(g)
	if err != nil {
		log.Println(err.Error())
		g.JSON(http.StatusUnauthorized, "Unauthorized")
		return
	}

	claims, err := _clerk.ClerkClient.VerifyToken(cookie)
	if err != nil {
		log.Println(err.Error())
		g.JSON(http.StatusUnauthorized, "Unauthorized")
		return
	}

	conversations, err := ch.messageModel.FindAllConversations(claims.Subject)
	if err != nil {
		log.Println(err.Error())
		g.JSON(http.StatusInternalServerError, "Failed to get conversation")
		return
	}

	userIds := make([]string, 0)
	for _, convo := range conversations {
		userIds = append(userIds, convo.UserId)
	}

	users, err := _clerk.ClerkClient.Users().ListAll(clerk.ListAllUsersParams{
		UserIDs: userIds,
	})
	if err != nil {
		log.Println(err.Error())
		g.JSON(http.StatusInternalServerError, "Failed to get conversations")
		return
	}

	for i, convo := range conversations {
		for j, userId := range userIds {
			if convo.UserId == userId {
				conversations[i].Username = *users[j].FirstName
				conversations[i].Avatar = users[j].ProfileImageURL
			}
		}
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

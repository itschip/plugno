package auth

import (
	"errors"
	"log"
	"net/http"
	"plugno-api/clerk"

	"github.com/gin-gonic/gin"
)

func Authorized() gin.HandlerFunc {
	return func(c *gin.Context) {
		var err error
		cookie, err := GetTokenFromRequest(c)
		if err != nil {
			log.Println("Failed getting cookie: ", err.Error())
		}

		_, err = clerk.ClerkClient.VerifyToken(cookie)

		if err != nil {
			c.Writer.WriteHeader(http.StatusUnauthorized)
			c.Writer.Write([]byte("Unauthorized"))
			c.Abort()
			return
		}

		c.Next()
	}
}

func GetTokenFromRequest(c *gin.Context) (string, error) {
	var cookie string
	cookie, err := c.Cookie("token")
	if err != nil {
		log.Println(err.Error())
	}

	// If we dont find any cookie in the request, we try to look for the token in the header
	if cookie == "" {
		cookie = c.GetHeader("Authorization")
	}

	if cookie == "" {
		return "", errors.New("No token found")
	}

	return cookie, nil
}

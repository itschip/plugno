package auth

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func Authorized() gin.HandlerFunc {
	return func(c *gin.Context) {
		var err error
		cookie, err := c.Cookie("token")
		if err != nil {
			log.Println(err.Error())
		}

		_, err = jwt.ParseWithClaims(cookie, &Claims{}, func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil {
			c.Writer.WriteHeader(http.StatusUnauthorized)
			c.Writer.Write([]byte("You are unauthorized"))
			c.Abort()
			return
		}

		c.Next()
	}
}

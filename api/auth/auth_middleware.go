package auth

import (
	"fmt"
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
			log.Println("Failed getting cookie: ", err.Error())
		}

		_, err = jwt.ParseWithClaims(cookie, &Claims{}, func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil {
			fmt.Println("NOT AUTH")
			fmt.Println("MIddleware: ", err.Error())
			c.Writer.WriteHeader(http.StatusUnauthorized)
			c.Writer.Write([]byte("Unauthorized"))
			c.Abort()
			return
		}

		c.Next()
	}
}

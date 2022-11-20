package auth

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type RegisterReq struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

var jwtKey = []byte("veri_secret_key")

func HandleRegister(c *gin.Context) {
	var register RegisterReq
	err := c.BindJSON(&register)
	if err != nil {
		log.Println(err.Error())
	}

	fmt.Println("Register data")
	fmt.Println(register)

	expiryDate := time.Now().Add(15 * time.Minute)
	claims := &Claims{
		Username: register.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiryDate),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
	}

	c.SetCookie("token", tokenString, int(expiryDate.UnixMilli()), "/", "localhost", false, true)
}

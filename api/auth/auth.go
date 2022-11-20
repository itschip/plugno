package auth

import (
	"fmt"
	"log"
	"net/http"
	"plugno-api/db"
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
		c.Writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if register.Email == "" || register.Username == "" || register.Password == "" {
		c.Writer.WriteHeader(http.StatusBadRequest)
		c.Writer.Write([]byte("Missing field when trying to register"))
		return
	}

	// Create user
	query := "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
	res, err := db.Client.Exec(query, register.Username, register.Email, register.Password)
	if err != nil {
		log.Println(err.Error())
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	// TODO: Generate an actual UID for the user
	userID, err := res.LastInsertId()
	if err != nil {
		log.Println("(Register) res.LastInsertId", err)
	}

	fmt.Println(userID)

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
		return
	}

	c.SetCookie("token", tokenString, int(expiryDate.UnixMilli()), "/", "localhost", false, true)
}

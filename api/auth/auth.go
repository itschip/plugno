package auth

import (
	"database/sql"
	"log"
	"net/http"
	"plugno-api/models"
	"plugno-api/structs"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type RegisterReq struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}

type AuthHandler struct {
	db        *sql.DB
	userModel models.UserModel
}

func NewAuthHandler(s *structs.Server) *AuthHandler {
	return &AuthHandler{
		userModel: s.UserModel,
	}
}

var jwtKey = []byte("veri_secret_key")

func (auth *AuthHandler) RegisterUser(c *gin.Context) {
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

	// Check if user exists
	user, err := auth.userModel.GetUserFromEmail(register.Email)
	if err != nil {
		log.Fatalln("Failed to query user: ", err.Error())
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	if user.Email != "" {
		c.Writer.WriteHeader(http.StatusForbidden)
		c.Writer.Write([]byte("User already exists!"))
		return
	}

	// Create user
	newUser, err := auth.userModel.CreateUser(register.Username, register.Email, register.Password)
	if err != nil {
		log.Println(err.Error())
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	// TODO: Generate an actual UID for the user
	if err != nil {
		log.Println("(Register) res.LastInsertId", err)
	}

	expiryDate := time.Now().Add(1 * time.Hour)
	claims := &Claims{
		ID:       int(newUser.ID),
		Email:    newUser.Email,
		Username: newUser.Username,
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

	c.SetCookie("token", tokenString, 3600, "/", "localhost", false, true)
	c.JSON(200, map[string]any{
		"user":      newUser,
		"isSuccess": true,
	})
}

func (auth *AuthHandler) Login(c *gin.Context) {
	var login LoginReq
	err := c.BindJSON(&login)
	if err != nil {
		log.Println(err.Error())
		c.Writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if login.Email == "" || login.Password == "" {
		c.Writer.WriteHeader(http.StatusBadRequest)
		c.Writer.Write([]byte("Missing field when trying to login"))
		return
	}

	user, err := auth.userModel.GetUserFromEmail(login.Email)
	if err != nil {
		log.Fatalln("Failed to query user: ", err.Error())
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	// TODO: Better validation. Should probabbly just return a 'found' from the func above
	if user.Email == "" {
		c.Writer.WriteHeader(http.StatusBadRequest)
		c.Writer.Write([]byte("User does not exist"))
		return
	}

	expiryDate := time.Now().Add(1 * time.Hour)
	claims := &Claims{
		ID:       int(user.ID),
		Email:    user.Email,
		Username: user.Username,
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

	c.SetCookie("token", tokenString, 3600, "/", "localhost", false, true)
	c.JSON(200, map[string]any{
		"user":      user,
		"isSuccess": true,
	})
}

func (auth *AuthHandler) User(c *gin.Context) {
	cookie, err := c.Cookie("token")
	if err != nil {
		log.Println(err.Error())
	}

	token, err := jwt.ParseWithClaims(cookie, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		c.Writer.WriteHeader(http.StatusUnauthorized)
		c.Writer.Write([]byte("You are unauthorized"))
		return
	}

	claims := token.Claims.(*Claims)

	user, err := auth.userModel.GetUser(claims.ID)
	if err != nil {
		log.Fatalln("Failed to get query user:", err.Error())
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	c.JSON(200, user)
}

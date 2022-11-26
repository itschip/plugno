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
	ID       int
	Username string `json:"username"`
	jwt.RegisteredClaims
}

type AuthHandler struct {
	db        *sql.DB
	userModel models.UserModel
}

func NewAuthHandler(s *structs.Server) *AuthHandler {
	return &AuthHandler{
		db:        s.DB,
		userModel: s.UserModel,
	}
}

var jwtKey = []byte("veri_secret_key")

func (auth *AuthHandler) RegisterUser(c *gin.Context) {
	// c.Writer.Header().Set("Content-Type", "application/json")
	// c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	// c.Writer.Header().Set("Access-Control-Allow-Headers", "*")

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
	user := auth.userModel.GetUserFromEmail(register.Email)

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

	expiryDate := time.Now().Add(15 * time.Minute)
	claims := &Claims{
		ID:       int(newUser.ID),
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

	c.SetCookie("token", tokenString, 3600, "/", "localhost", false, true)
	c.JSON(200, "Successfully created new user")
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
}

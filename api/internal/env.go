package internal

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func EnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file\n")
	}

	return os.Getenv(key)
}

package db

import (
	"database/sql"
	"log"
	"os"
	"plugno-api/internal"

	_ "github.com/go-sql-driver/mysql"
)

var Client *sql.DB

func Open() {
	var err error
	internal.EnvVariable("DSN")
	Client, err = sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}

	if err := Client.Ping(); err != nil {
		log.Fatalf("failed to ping: %v", err)
	}

	log.Println("Successfully connected to PlanetScale!")
}

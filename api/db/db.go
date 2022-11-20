package db

import (
	"database/sql"
	"log"
	"os"
	"plugno-api/internal"

	_ "github.com/go-sql-driver/mysql"
)

func Open() *sql.DB {
	internal.EnvVariable("DSN")
	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("failed to ping: %v", err)
	}

	log.Println("Successfully connected to PlanetScale!")

	return db
}

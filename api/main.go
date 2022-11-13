package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
)

var App *pocketbase.PocketBase

func main() {
	App = pocketbase.New()

	if err := App.Start(); err != nil {
		log.Fatal(err)
	}
}

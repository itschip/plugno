package jobs

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

// Websocket connection for tracking job and where the plug currently is
func (jh *JobsHandler) ServeTracker(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err.Error())
	}

	defer conn.Close()

	go readTrackerMessage(conn)
}

func readTrackerMessage(conn *websocket.Conn) {
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err.Error())
		}

		log.Printf("New message: %s", message)
	}
}

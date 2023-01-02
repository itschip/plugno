package jobs

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

const (
	writeWait = 10 * time.Second

	pongWait = 60 * time.Second

	pingPeriod = (pongWait * 9) / 10

	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{}

type Tracking struct {
	clients map[*TrackingClient]bool

	broadcast chan []byte
}

type TrackingClient struct {
	conn      *websocket.Conn
	broadcast chan []byte
	send      chan []byte
}

// Websocket connection for tracking job and where the plug currently is
func (jh *JobsHandler) ServeTracker(c *gin.Context) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err.Error())
	}

	trackingClient := &TrackingClient{
		conn:      conn,
		send:      make(chan []byte, 256),
		broadcast: make(chan []byte, 256),
	}

	go trackingClient.readTrackerMessage()
	go trackingClient.writeTrackingMessage()
}

func (client *TrackingClient) readTrackerMessage() {
	defer func() {
		client.conn.Close()
	}()

	client.conn.SetReadLimit(maxMessageSize)
	client.conn.SetReadDeadline(time.Now().Add(pongWait))
	client.conn.SetPongHandler(func(appData string) error {
		client.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	fmt.Println("websocket connected")

	for {
		_, message, err := client.conn.ReadMessage()
		if err != nil {
			log.Println(err.Error())
		}

		log.Printf("New message: %s", message)

		client.broadcast <- message
	}
}

func (client *TrackingClient) writeTrackingMessage() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		client.conn.Close()
	}()

	for {
		select {
		case message, ok := <-client.broadcast:
			fmt.Println("NEW TRACKING MESSAGE:", string(message))
			if !ok {
				fmt.Println("Failed to track message")
			}
		case <-ticker.C:
			client.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := client.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

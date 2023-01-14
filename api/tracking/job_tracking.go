package tracking

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/itschip/expogo"
)

const (
	writeWait = 10 * time.Second

	pongWait = 60 * time.Second

	pingPeriod = (pongWait * 9) / 10

	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{}

// TODO: Add a job room map
type Tracking struct {
	clients    map[*TrackingClient]bool
	register   chan *TrackingClient
	unregister chan *TrackingClient

	broadcast chan []byte
}

type TrackingClient struct {
	tracking   *Tracking
	conn       *websocket.Conn
	send       chan []byte
	expoClient *expogo.ExpoClient
}

type TrackingMessage struct {
	Type  string `json:"type"`
	JobID int    `json:"jobId"`
}

func NewTracking() *Tracking {
	return &Tracking{
		clients:    make(map[*TrackingClient]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *TrackingClient),
		unregister: make(chan *TrackingClient),
	}
}

func (tracking *Tracking) RunTracking() {
	for {
		select {
		// Register a new client for the tracking map
		case client := <-tracking.register:
			tracking.clients[client] = true
		case client := <-tracking.unregister:
			if _, ok := tracking.clients[client]; ok {
				delete(tracking.clients, client)
				close(client.send)
			}
		case message := <-tracking.broadcast:
			for client := range tracking.clients {
				select {
				case client.send <- message:
					fmt.Printf("New message from RunTracking: %s\n", message)
				default:
					close(client.send)
					delete(tracking.clients, client)
				}
			}
		}
	}
}

// Websocket connection for tracking job and where the plug currently is
func (handler *TrackingHandler) ServeTracker(tracking *Tracking, c *gin.Context) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}

	log.Println("Serving tracker")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err.Error())
	}

	expoClient := expogo.NewExpoClient(nil)

	trackingClient := &TrackingClient{
		tracking:   tracking,
		conn:       conn,
		send:       make(chan []byte, 256),
		expoClient: expoClient,
	}

	fmt.Println("Registering client")
	log.Println(trackingClient)

	trackingClient.tracking.register <- trackingClient

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

	for {
		_, message, err := client.conn.ReadMessage()
		if err != nil {

			if websocket.IsCloseError(err, 1000) {
				log.Printf("Tracking Closed with 1000: %v", err)
				break
			}

			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Tracking Error: %v", err)
			}
			break
		}

		var trackingMessage TrackingMessage
		reader := bytes.NewReader(message)
		decoded := json.NewDecoder(reader)
		err = decoded.Decode(&trackingMessage)
		if err != nil {
			log.Printf("Failed to decode tracking message: %v", err.Error())
			return
		}

		switch messageType := trackingMessage.Type; messageType {
		case "accepted":
			fmt.Printf("Job ID %v accepted", trackingMessage.JobID)
		case "in_transit":
			fmt.Printf("Job ID %v is in transit", trackingMessage.JobID)
		case "active":
			fmt.Printf("Job ID %v is active", trackingMessage.JobID)
		case "completed":
			fmt.Printf("Job ID %v is completed", trackingMessage.JobID)
		default:
			fmt.Println("No message type.")
		}

		client.expoClient.SendPushNotification(&expogo.Notification{
			To:    []string{"ExponentPushToken[jgjpK8NQcb4475rh2nn4K9]"},
			Title: "Job Update",
			Body:  "Your job has been updated",
		})

		client.tracking.broadcast <- message
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
		case message, ok := <-client.send:
			fmt.Println("NEW TRACKING MESSAGE:", string(message))

			client.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				client.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := client.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}

			w.Write(message)

			if err := w.Close(); err != nil {
				return
			}

		case <-ticker.C:
			client.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := client.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

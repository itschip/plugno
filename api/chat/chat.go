package chat

import "fmt"

type Message struct {
	data   []byte
	roomId string
}

type Chat struct {
	clients map[*Client]bool

	rooms map[string]map[*Client]bool

	broadcast chan Message

	register chan *Client

	unregister chan *Client
}

func NewChat() *Chat {
	return &Chat{
		broadcast:  make(chan Message),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		rooms:      make(map[string]map[*Client]bool),
		clients:    make(map[*Client]bool),
	}
}

func (c *Chat) Run() {
	for {
		select {
		case client := <-c.register:
			connections := c.rooms[client.roomId]

			if connections == nil {
				connections = make(map[*Client]bool)
				c.rooms[client.roomId] = connections
			}

			c.rooms[client.roomId][client] = true
		case client := <-c.unregister:
			connections := c.rooms[client.roomId]

			if _, ok := connections[client]; ok {
				delete(connections, client)
				close(client.send)
			}

		case message := <-c.broadcast:
			connections := c.rooms[message.roomId]

			for client := range connections {
				select {
				case client.send <- message.data:
					fmt.Println("new message", string(message.data))
				default:
					close(client.send)
					delete(connections, client)
				}
			}
		}
	}
}

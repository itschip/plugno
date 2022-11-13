package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
)

type connection struct {
	ws   *websocket.Conn
	send chan []byte
}

type subscription struct {
	conn *connection
	room string
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func Open() {
	App.OnBeforeServe().Add(func(data *core.ServeEvent) error {
		data.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "api/chat/connect",
			Handler: func(c echo.Context) error {
				serve(c.Response().Writer, c.Request(), "1")

				return nil
			},
		})

		return nil
	})
}

func serve(w http.ResponseWriter, r *http.Request, roomId string) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c := &connection{
		send: make(chan []byte, 256),
		ws:   ws,
	}

	s := subscription{c, roomId}
}

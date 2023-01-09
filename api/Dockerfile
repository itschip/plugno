FROM golang:1.19-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . ./ 

RUN go build -o plug-api

EXPOSE 6001

CMD [ "./plug-api" ]

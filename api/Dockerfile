FROM golang:1.19-alpine

WORKDIR /app

COPY . ./ 

RUN go mod download

RUN go build -o plug-api

EXPOSE 6001

CMD [ "./plug-api" ]

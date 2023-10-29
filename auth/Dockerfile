FROM golang:alpine

WORKDIR /app

COPY go.mod .

RUN go mod tidy

COPY . .

CMD ["go","run","src/main.go"]
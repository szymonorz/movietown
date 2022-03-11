FROM golang:latest

WORKDIR /cinema-be

COPY /cinema-be/go.mod .
COPY /cinema-be/go.sum .

RUN go mod download

COPY /cinema-be /cinema-be

RUN go build

CMD ["./cinema-be"]

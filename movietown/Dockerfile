FROM golang:1.17.8

WORKDIR /movietown

COPY /movietown/go.mod .
COPY /movietown/go.sum .

RUN go mod download

COPY /movietown /movietown

RUN go build

CMD ["./movietown"]

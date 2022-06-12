# MovieTown

A (very simple) webapp simulating the customer side of a movie theater.
Backend is written in Go 1.17.8 (using version >=1.18 might require some code changes).
Frontend is written in React 17.
Database is in PostgreSQL (look at `docker-compose-yml`).

## How to start

First make sure the database is running.

```bash
	docker-compose up movietown-db
``` 

Then run the backend.

```bash
	go run main.go
	#
	go build
	./movietown
```

You can also start the Golangs backend in Docker

```bash
	docker-compose up movietown
	# OR START IT AT THE SAME TIME AS THE POSTGRES DATABASE
	docker-compose up
```

Then run the frontend.

```bash
	npm start
```

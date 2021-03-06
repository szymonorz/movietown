// Package docs GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/v1/customer/delete": {
            "delete": {
                "description": "Delete customer of sepcified id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "customer"
                ],
                "summary": "Delete Customer",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/api/v1/customer/info": {
            "get": {
                "description": "get customer's info from token",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "customer"
                ],
                "summary": "Gets information about employee with specified username",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "type"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            },
            "put": {
                "description": "update customer's info",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "customer"
                ],
                "summary": "Updates cutomer's information",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "updated employee information",
                        "name": "customer",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.requestBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "type"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/api/v1/customer/login": {
            "post": {
                "description": "Login as a customer and return AccessToken (not yet implemented)",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "customer"
                ],
                "summary": "Login as a customer",
                "parameters": [
                    {
                        "description": "login customer DTO",
                        "name": "customer",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.apiCustomerLogin"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Customer"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/api/v1/customer/password": {
            "put": {
                "description": "customer changes their own password by themselfs",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "customer"
                ],
                "summary": "ChangePassword",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "change employee password",
                        "name": "employee",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.changePasswordBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/api/v1/customer/register": {
            "post": {
                "description": "register new customer",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "customer"
                ],
                "summary": "Creates new customer",
                "parameters": [
                    {
                        "description": "create customer",
                        "name": "customer",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.apiCustomerRegister"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "type"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/api/v1/movies": {
            "get": {
                "description": "get []model.Movie",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "movie"
                ],
                "summary": "Show movies",
                "parameters": [
                    {
                        "type": "string",
                        "description": "title",
                        "name": "title",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "limit",
                        "name": "limit",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "offset",
                        "name": "offset",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Movie"
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/movies/{movie_id}": {
            "get": {
                "description": "get []model.Movie",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "movie"
                ],
                "summary": "Show movie info",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "movie_id",
                        "name": "movie_id",
                        "in": "path"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Movie"
                        }
                    }
                }
            }
        },
        "/api/v1/reservations": {
            "get": {
                "description": "get []reservationResponse by customer_id from token",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "reservations"
                ],
                "summary": "Show reservations",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/api.reservationResponse"
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/reservations/customer/create": {
            "post": {
                "description": "make reservation as a customer",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "reservations"
                ],
                "summary": "Customer makes a seat reservation for screening",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "guest reservation DTO",
                        "name": "guestReservation",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.customerReservation"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "integer"
                        }
                    }
                }
            }
        },
        "/api/v1/reservations/customer/{customer_id}": {
            "get": {
                "description": "get []Reservation by customer_id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "reservations"
                ],
                "summary": "Show reservations",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "type": "string",
                        "format": "int",
                        "description": "reservation search by customer_id",
                        "name": "customer_id",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Reservation"
                        }
                    }
                }
            }
        },
        "/api/v1/reservations/discounts": {
            "get": {
                "description": "Shows all discount available",
                "tags": [
                    "reservations"
                ],
                "summary": "Shows all discount available",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/definitions/model.DiscountType"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/reservations/seats/{screening_id}": {
            "get": {
                "description": "get takenSeats by customer_id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "reservations"
                ],
                "summary": "Show reserved seats for screening",
                "parameters": [
                    {
                        "type": "string",
                        "format": "int",
                        "description": "search reserved seats for screening_id",
                        "name": "screening_id",
                        "in": "path"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/api.takenSeats"
                        }
                    }
                }
            }
        },
        "/api/v1/reservations/types": {
            "get": {
                "description": "Show reservations types",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "reservations"
                ],
                "summary": "Show reservations types",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/definitions/model.ReservationType"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/screening": {
            "get": {
                "description": "get []Screening",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "screening"
                ],
                "summary": "Show screenings",
                "parameters": [
                    {
                        "type": "string",
                        "description": "first",
                        "name": "from",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "description": "second",
                        "name": "to",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "limit",
                        "name": "limit",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "offset",
                        "name": "offset",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Screening"
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/screening/add": {
            "post": {
                "description": "Boss is able to add a new screening",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "screening"
                ],
                "summary": "Add new screening",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "add screening DTO",
                        "name": "screening",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.newScreening"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/api/v1/screening/s/{id}": {
            "get": {
                "description": "get Screening by id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "screening"
                ],
                "summary": "Show screenings",
                "parameters": [
                    {
                        "type": "integer",
                        "format": "int",
                        "description": "screening search by id",
                        "name": "id",
                        "in": "path"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Screening"
                        }
                    }
                }
            }
        },
        "/api/v1/screening/seats/{movie_hall_id}": {
            "get": {
                "description": "get []model.MovieHallRow by movie_hall_id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "movie_hall_rows"
                ],
                "summary": "Returns rows for movie_hall_id",
                "parameters": [
                    {
                        "type": "integer",
                        "format": "int",
                        "description": "rows in movie_hall_id",
                        "name": "movie_hall_id",
                        "in": "path"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.MovieHallRow"
                            }
                        }
                    }
                }
            }
        },
        "/api/v1/screening/{movie_id}": {
            "get": {
                "description": "get []Screening by movie_id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "screening"
                ],
                "summary": "Show screenings",
                "parameters": [
                    {
                        "type": "integer",
                        "format": "int",
                        "description": "screening search by movie_id",
                        "name": "movie_id",
                        "in": "path"
                    },
                    {
                        "type": "string",
                        "description": "first",
                        "name": "from",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "description": "second",
                        "name": "to",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "limit",
                        "name": "limit",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "offset",
                        "name": "offset",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Screening"
                            }
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "api.apiCustomerLogin": {
            "type": "object",
            "required": [
                "password",
                "username"
            ],
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "api.apiCustomerRegister": {
            "type": "object",
            "required": [
                "email",
                "name",
                "password",
                "phone_number",
                "surname",
                "username"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "surname": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "api.changePasswordBody": {
            "type": "object",
            "required": [
                "new_password",
                "old_password"
            ],
            "properties": {
                "new_password": {
                    "type": "string"
                },
                "old_password": {
                    "type": "string"
                }
            }
        },
        "api.customerReservation": {
            "type": "object",
            "required": [
                "reservation_type_id",
                "screening_id",
                "seat_ids"
            ],
            "properties": {
                "discounts": {
                    "$ref": "#/definitions/model.RequestSeats"
                },
                "reservation_type_id": {
                    "type": "integer"
                },
                "screening_id": {
                    "type": "integer"
                },
                "seat_ids": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                }
            }
        },
        "api.newScreening": {
            "type": "object",
            "required": [
                "movie_hall_id",
                "movie_id",
                "start_of_screening"
            ],
            "properties": {
                "movie_hall_id": {
                    "type": "integer"
                },
                "movie_id": {
                    "type": "integer"
                },
                "start_of_screening": {
                    "type": "string"
                }
            }
        },
        "api.requestBody": {
            "type": "object",
            "required": [
                "email",
                "name",
                "phone_number",
                "surname",
                "username"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "surname": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "api.reservationResponse": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "movie_title": {
                    "type": "string"
                },
                "movie_type": {
                    "type": "string"
                },
                "price": {
                    "type": "number"
                },
                "reservation_type": {
                    "type": "string"
                },
                "seat_count": {
                    "type": "integer"
                },
                "time_of_screening": {
                    "type": "string"
                }
            }
        },
        "api.takenSeats": {
            "type": "object",
            "properties": {
                "taken_seat_ids": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                }
            }
        },
        "model.Customer": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "is_student": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "surname": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "model.DiscountType": {
            "type": "object",
            "properties": {
                "discount": {
                    "type": "integer"
                },
                "id": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                }
            }
        },
        "model.Movie": {
            "type": "object",
            "properties": {
                "description": {
                    "type": "string"
                },
                "director": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "length": {
                    "type": "integer"
                },
                "movie_types": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.MovieType"
                    }
                },
                "title": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            }
        },
        "model.MovieHall": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "movieHallRows": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.MovieHallRow"
                    }
                },
                "name": {
                    "type": "string"
                },
                "number_of_seats": {
                    "type": "integer"
                }
            }
        },
        "model.MovieHallRow": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "movie_hall_id": {
                    "type": "integer"
                },
                "row": {
                    "$ref": "#/definitions/model.Row"
                },
                "row_id": {
                    "type": "integer"
                },
                "row_number": {
                    "type": "integer"
                }
            }
        },
        "model.MovieMovieType": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "movie": {
                    "$ref": "#/definitions/model.Movie"
                },
                "movieId": {
                    "type": "integer"
                },
                "movieTypeId": {
                    "type": "integer"
                },
                "movie_type": {
                    "$ref": "#/definitions/model.MovieType"
                }
            }
        },
        "model.MovieType": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "price": {
                    "type": "number"
                },
                "type": {
                    "type": "string"
                }
            }
        },
        "model.RequestSeats": {
            "type": "object",
            "properties": {
                "children_seats": {
                    "type": "integer"
                },
                "elderly_seats": {
                    "type": "integer"
                },
                "normal_seats": {
                    "type": "integer"
                },
                "student_seats": {
                    "type": "integer"
                }
            }
        },
        "model.Reservation": {
            "type": "object",
            "properties": {
                "active": {
                    "type": "boolean"
                },
                "customer": {
                    "$ref": "#/definitions/model.Customer"
                },
                "customerId": {
                    "type": "integer"
                },
                "id": {
                    "type": "integer"
                },
                "paid": {
                    "type": "boolean"
                },
                "reservationType": {
                    "$ref": "#/definitions/model.ReservationType"
                },
                "reservationTypeId": {
                    "type": "integer"
                },
                "reserved": {
                    "type": "boolean"
                },
                "screening": {
                    "$ref": "#/definitions/model.Screening"
                },
                "screeningId": {
                    "type": "integer"
                }
            }
        },
        "model.ReservationType": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                }
            }
        },
        "model.Row": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "seat_limit": {
                    "type": "integer"
                },
                "seats": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.Seat"
                    }
                }
            }
        },
        "model.Screening": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "mm_type": {
                    "$ref": "#/definitions/model.MovieMovieType"
                },
                "movieMovieTypeId": {
                    "type": "integer"
                },
                "movie_hall": {
                    "$ref": "#/definitions/model.MovieHall"
                },
                "movie_hall_id": {
                    "type": "integer"
                },
                "start_of_screening": {
                    "type": "string"
                }
            }
        },
        "model.Seat": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "row_id": {
                    "type": "integer"
                },
                "seat_number": {
                    "type": "integer"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "0.1-alpha",
	Host:             "localhost:4000",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "MovieTown API",
	Description:      "This is a mistake.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}

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
        "/api/v1/employee/create": {
            "post": {
                "description": "register new employee",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "employee"
                ],
                "summary": "Creates new employee",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "create employee",
                        "name": "employee",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.apiEmployeeRegister"
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
        "/api/v1/employee/delete/{id}": {
            "delete": {
                "description": "Delete employee of sepcified id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "employee"
                ],
                "summary": "Delete Employee",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "delete employee of :id",
                        "name": "id",
                        "in": "path",
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
        "/api/v1/employee/info": {
            "put": {
                "description": "update employee's info",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "employee"
                ],
                "summary": "Updates employees information",
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
                        "name": "employee",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.EmployeeInfo"
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
        "/api/v1/employee/info/{username}": {
            "get": {
                "description": "get employee's info",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "employee"
                ],
                "summary": "Gets information about employee with specified username",
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
                        "description": "Employee's username",
                        "name": "username",
                        "in": "path",
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
            }
        },
        "/api/v1/employee/login": {
            "post": {
                "description": "Login as a employee and return AccessToken (not yet implemented)",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "employee"
                ],
                "summary": "Login as an employee",
                "parameters": [
                    {
                        "description": "login employee DTO",
                        "name": "employee",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.apiEmployeeLogin"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Employee"
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
        "/api/v1/employee/password": {
            "put": {
                "description": "Employee changes their own password by themselfs",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "employee"
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
        "/api/v1/employee/role": {
            "put": {
                "description": "update employee_id's role with",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "employee"
                ],
                "summary": "Updates employees role",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Authorization",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "change employee's role",
                        "name": "employee",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/api.changeRole"
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
        "/ping/{customer_id}": {
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
        "api.apiEmployeeLogin": {
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
        "api.apiEmployeeRegister": {
            "type": "object",
            "required": [
                "email",
                "name",
                "password",
                "phone_number",
                "role_id",
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
                "role_id": {
                    "type": "integer"
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
                "old_passowrd"
            ],
            "properties": {
                "new_password": {
                    "type": "string"
                },
                "old_passowrd": {
                    "type": "string"
                }
            }
        },
        "api.changeRole": {
            "type": "object",
            "properties": {
                "employee_id": {
                    "type": "integer"
                },
                "new_role_id": {
                    "type": "integer"
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
        "model.Employee": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
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
                "role": {
                    "$ref": "#/definitions/model.Role"
                },
                "roleId": {
                    "type": "integer"
                },
                "surname": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "model.EmployeeInfo": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "role": {
                    "$ref": "#/definitions/model.Role"
                },
                "role_id": {
                    "type": "integer"
                },
                "surname": {
                    "type": "string"
                },
                "username": {
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
                "movieType": {
                    "$ref": "#/definitions/model.MovieType"
                },
                "movieTypeId": {
                    "type": "integer"
                },
                "title": {
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
                "name": {
                    "type": "string"
                },
                "number_of_seats": {
                    "type": "integer"
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
                    "type": "integer"
                },
                "type": {
                    "type": "string"
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
                "employee": {
                    "$ref": "#/definitions/model.Employee"
                },
                "employeeId": {
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
        "model.Role": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "role_name": {
                    "type": "string"
                }
            }
        },
        "model.Screening": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "movie": {
                    "$ref": "#/definitions/model.Movie"
                },
                "movieHall": {
                    "$ref": "#/definitions/model.MovieHall"
                },
                "movieHallId": {
                    "type": "integer"
                },
                "movieId": {
                    "type": "integer"
                },
                "reservations": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.Reservation"
                    }
                },
                "start_of_screening": {
                    "type": "string"
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

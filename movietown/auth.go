package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type AuthMiddleware struct {
}

func NewAuthMiddleware() AuthMiddleware {
	return AuthMiddleware{}
}

func (auth *AuthMiddleware) TokenValid(r *http.Request) (jwt.MapClaims, error) {
	token, err := auth.VerifyToken(r)
	if err != nil {
		return nil, err
	}
	var claims jwt.MapClaims
	var ok bool
	if claims, ok = token.Claims.(jwt.MapClaims); !ok && !token.Valid {
		return nil, err
	}
	return claims, nil
}

func (auth *AuthMiddleware) VerifyToken(r *http.Request) (*jwt.Token, error) {
	tokenString := ExtractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("test"), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func (auth *AuthMiddleware) CustomerAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, err := auth.TokenValid(c.Request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		if claims["role"] != "customer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user unathorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func (auth *AuthMiddleware) EmployeeAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, err := auth.TokenValid(c.Request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		switch c.FullPath() {
		case "/api/v1/employee/create":
			if claims["role"] != "manager" {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "employee unathorized to use this feature"})
				c.Abort()
				return
			}
		case "/api/v1/screening/create",
			"/api/v1/screening/sellTicket":
			if claims["role"] != "wagie" && claims["role"] != "manager" {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "employee unathorized to use this feature"})
				c.Abort()
				return
			}
		}
		c.Next()
	}
}

func ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

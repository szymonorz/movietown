package auth

import (
	"fmt"
	"movietown/model"
	"movietown/service"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type AuthMiddleware struct {
	CustomerService service.CustomerService
}

func NewAuthMiddleware(customerService service.CustomerService) AuthMiddleware {
	return AuthMiddleware{CustomerService: customerService}
}

func (auth *AuthMiddleware) TokenValid(r *http.Request, secret string) (jwt.MapClaims, error) {
	token, err := auth.VerifyToken(r, secret)
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

func (auth *AuthMiddleware) VerifyToken(r *http.Request, secret string) (*jwt.Token, error) {
	tokenString := auth.extractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func (auth *AuthMiddleware) CustomerAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		_, err := auth.TokenValid(c.Request, "CustomerSecret")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		c.Next()
	}
}

func (auth *AuthMiddleware) GetCustomerFromRequest(r *http.Request) (*model.Customer, error) {
	token, err := auth.VerifyToken(r, "CustomerSecret")
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok && !token.Valid {
		return nil, err
	}
	id := claims["identitykey"].(float64)
	customer, err := auth.CustomerService.FindCustomerById(uint(id))
	if err != nil {
		return nil, err
	}
	return customer, nil
}

func (auth *AuthMiddleware) GetCustomerInfoFromRequest(r *http.Request) (*model.CustomerInfo, error) {
	token, err := auth.VerifyToken(r, "CustomerSecret")
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok && !token.Valid {
		return nil, err
	}
	id := claims["identitykey"].(float64)
	customer, err := auth.CustomerService.FindCustomerInfoById(uint(id))
	if err != nil {
		return nil, err
	}
	return customer, nil
}

func (auth *AuthMiddleware) extractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

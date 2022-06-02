package api

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func generateTokenPair(id uint, role string) (map[string]string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["identitykey"] = id
	claims["exp"] = time.Now().Add(time.Hour * 10).Unix()
	var secret string
	if role == "customer" {
		secret = "CustomerSecret"
	} else {
		secret = "EmployeeSecret"
	}
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		return nil, err
	}

	return map[string]string{
		"access_token": t,
	}, nil
}

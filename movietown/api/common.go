package api

import (
	"regexp"
	"unicode"
)

type changePasswordBody struct {
	OldPassword string `json:"old_password" validate:"required"`
	NewPassword string `json:"new_password" validate:"required"`
}

var email_regex = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

func validatePassword(password string) bool {
	var (
		upper, lower, number, symbol bool
		length                       uint
	)

	for _, token := range password {
		switch {
		case unicode.IsUpper(token):
			upper = true
			length++
		case unicode.IsLower(token):
			lower = true
			length++
		case unicode.IsNumber(token):
			number = true
			length++
		case unicode.IsPunct(token) || unicode.IsSymbol(token):
			symbol = true
			length++
		default:
			return false
		}
	}

	if !upper || !lower || !number || !symbol || length < 8 {
		return false
	}

	return true
}

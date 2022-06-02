package merror

import "errors"

var (
	ErrSeatTaken              = errors.New("seat taken")
	ErrSeatNotExists          = errors.New("seat doesn't exist")
	ErrNumberOfSeatsDontMatch = errors.New("number of seats do not match")
)

package model

import (
	"time"
)

type Screening struct {
	ID                 uint `gorm:"primaryKey,foreignKey=screening_id"`
	MovieId            *uint
	Movie              Movie `gorm:"foreignKey:MovieId"`
	MovieHallId        *uint
	MovieHall          MovieHall `gorm:"foreignKey:MovieHallId"`
	Reservations       []Reservation
	Start_of_screening time.Time
}

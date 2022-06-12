package model

import "time"

type Reservation struct {
	ID                uint `gorm:"primaryKey"`
	ScreeningId       uint
	Screening         Screening `gorm:"foreignKey:ScreeningId"`
	CustomerId        *uint
	Customer          Customer `gorm:"foreignKey:CustomerId"`
	Reserved          bool
	Paid              bool
	Active            bool
	ReservationTypeId uint
	ReservationType   ReservationType `gorm:"foreignKey:ReservationTypeId"`
}

type RequestReservation struct {
	ID              uint      `json:"id"`
	MovieTitle      string    `json:"movie_title"`
	MovieType       string    `json:"movie_type"`
	MovieTypePrice  float64   `json:"movie_type_price"`
	TimeOfScreening time.Time `json:"time_of_screening"`
	ReservationType string    `json:"reservation_type"`
	Price           float64   `json:"price"`
}

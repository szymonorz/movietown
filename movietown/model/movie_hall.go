package model

type MovieHall struct {
	ID              uint `gorm:"primaryKey"`
	Name            string
	Number_of_seats uint
}

package model

type MovieHall struct {
	ID              uint   `gorm:"primaryKey" json:"id"`
	Name            string `json:"name"`
	Number_of_seats uint   `json:"number_of_seats"`
}

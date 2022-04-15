package model

type Seat struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Row         uint      `json:"row"`
	Column      uint      `json:"col"`
	MovieHallId *uint     `json:"movie_hall_id"`
	MovieHall   MovieHall `gorm:"foreignKey:MovieHallId"`
}

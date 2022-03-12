package model

type Seat struct {
	ID          uint `gorm:"primaryKey"`
	Number      uint
	Row         uint
	Column      uint
	MovieHallId *uint
	MovieHall   MovieHall `gorm:"foreignKey:MovieHallId"`
}

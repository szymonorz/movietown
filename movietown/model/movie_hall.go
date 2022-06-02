package model

type MovieHall struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	Name          string         `json:"name"`
	MovieHallRows []MovieHallRow `gorm:"foreignKey:MovieHallId"`
}

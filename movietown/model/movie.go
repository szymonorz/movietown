package model

type Movie struct {
	ID          uint `gorm:"primaryKey"`
	Title       string
	Director    string
	Description string
	Length      int
	MovieTypeId *uint
	MovieType   MovieType `gorm:"foreignKey:MovieTypeId"`
}

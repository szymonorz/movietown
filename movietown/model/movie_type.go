package model

type MovieType struct {
	ID    uint `gorm:"primaryKey"`
	Type  string
	Price uint
}

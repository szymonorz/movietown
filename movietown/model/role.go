package model

type Role struct {
	ID       uint `gorm:"primaryKey"`
	RoleName string
}

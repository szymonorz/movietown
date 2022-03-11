package model

type Employee struct {
	ID           uint `gorm:"primaryKey"`
	Name         string
	Surname      string
	Phone_number string
	Email        string
	Username     string
	Password     string
	RoleId       *uint
	Role         Role `gorm:"foreignKey:RoleId"`
}

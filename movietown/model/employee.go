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

type EmployeeInfo struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	Phone_number string `json:"phone_number"`
	Email        string `json:"email"`
	Username     string `json:"username"`
	RoleId       *uint  `json:"role_id"`
	Role         Role   `gorm:"foreignKey:RoleId" json:"role"`
}

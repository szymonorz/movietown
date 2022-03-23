package model

type Customer struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	Phone_number string `json:"phone_number"`
	Email        string `json:"email"`
	Username     string `json:"username"`
	Password     string `json:"password"`
	Is_student   bool   `gorm:"default:false" json:"is_student"`
}

type CustomerInfo struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	Phone_number string `json:"phone_number"`
	Email        string `json:"email"`
	Username     string `json:"username"`
	Is_student   bool   `json:"is_student"`
}

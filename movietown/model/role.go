package model

type Role struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	RoleName string `json:"role_name"`
}

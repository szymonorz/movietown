package model

type DiscountType struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Type     string `json:"type"`
	Discount uint   `json:"discount"`
}

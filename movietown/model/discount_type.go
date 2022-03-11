package model

type DiscountType struct {
	ID       uint `gorm:"primaryKey"`
	Type     string
	Discount uint
}

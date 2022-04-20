package model

type Reservation struct {
	ID                uint `gorm:"primaryKey"`
	ScreeningId       uint
	Screening         Screening `gorm:"foreignKey:ScreeningId"`
	CustomerId        *uint
	Customer          Customer `gorm:"foreignKey:CustomerId"`
	Reserved          bool
	Paid              bool
	Active            bool
	ReservationTypeId uint
	ReservationType   ReservationType `gorm:"foreignKey:ReservationTypeId"`
}

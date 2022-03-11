package model

type ReservedSeat struct {
	ID             uint `gorm:"primaryKey"`
	SeatId         *uint
	Seat           Seat `gorm:"foreignKey:SeatId"`
	ScreeningId    *uint
	Screening      Screening `gorm:"foreignKey:ScreeningId"`
	DiscountTypeId *uint
	DiscountType   DiscountType `gorm:"foreignKey:DiscountTypeId"`
	ReservationId  *uint
	Reservation    Reservation `gorm:"foreignKey:ReservationId"`
}

package model

type ReservedSeat struct {
	ID             uint `gorm:"primaryKey"`
	SeatId         uint
	Seat           Seat `gorm:"foreignKey:SeatId"`
	ScreeningId    uint
	Screening      Screening `gorm:"foreignKey:ScreeningId"`
	DiscountTypeId uint
	DiscountType   DiscountType `gorm:"foreignKey:DiscountTypeId"`
	ReservationId  uint
	Reservation    Reservation `gorm:"foreignKey:ReservationId"`
	MovieHallRowId uint
	MovieHallRow   MovieHallRow `gorm:"foreignKey:MovieHallRowId"`
}

type DiscountSeats struct {
	NormalSeats   uint `json:"normal_seats"`
	ChildrenSeats uint `json:"children_seats"`
	StudentSeats  uint `json:"student_seats"`
	ElderlySeats  uint `json:"elderly_seats"`
}

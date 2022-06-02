package model

type Row struct {
	ID        uint   `json:"id"`
	SeatLimit uint   `json:"seat_limit"`
	Seats     []Seat `gorm:"foreignKey:RowId"`
}

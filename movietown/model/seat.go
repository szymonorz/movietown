package model

type Seat struct {
	ID         uint `gorm:"primaryKey" json:"id"`
	RowId      uint `json:"row_id"`
	SeatNumber uint `json:"seat_number"`
	// MovieHallId *uint     `json:"movie_hall_id"`
	// MovieHall   MovieHall `gorm:"foreignKey:MovieHallId"`
}

type RequestSeat struct {
	Seat
	RowNumber uint `json:"row_number"`
}

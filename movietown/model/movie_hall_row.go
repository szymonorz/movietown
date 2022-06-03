package model

type MovieHallRow struct {
	ID          uint `json:"id"`
	RowId       uint `json:"row_id"`
	Row         Row  `gorm:"foreignKey:RowId" json:"row"`
	MovieHallId uint `json:"movie_hall_id"`
	RowNumber   uint `json:"row_number"`
}

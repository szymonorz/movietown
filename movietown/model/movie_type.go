package model

type MovieType struct {
	ID    uint    `gorm:"primaryKey" json:"id"`
	Type  string  `json:"type"`
	Price float64 `json:"price"`
}

type MovieMovieType struct {
	ID          uint `gorm:"primaryKey" json:"id"`
	MovieId     *uint
	Movie       Movie `gorm:"foreignKey:MovieId" json:"movie"`
	MovieTypeId *uint
	MovieType   MovieType `gorm:"foreignKey:MovieTypeId" json:"movie_type"`
}

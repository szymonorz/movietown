package model

type Movie struct {
	ID          uint        `gorm:"primaryKey" json:"id"`
	Title       string      `json:"title"`
	Director    string      `json:"director"`
	Description string      `json:"description"`
	Length      int         `json:"length"`
	Url         string      `json:"url"`
	MovieType   []MovieType `gorm:"many2many:movie_movie_types" json:"movie_types"`
}

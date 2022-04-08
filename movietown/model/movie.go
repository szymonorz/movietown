package model

type Movie struct {
	ID          uint `gorm:"primaryKey" json:"id"` 
	Title       string `json:"title"`
	Director    string `json:"director"`
	Description string `json:"description"`
	Length      int     `json:"length"`
	MovieTypeId *uint   `json:"movie_type_id"`
	MovieType   MovieType `gorm:"foreignKey:MovieTypeId" json:"movie_type"`
}

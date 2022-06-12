package model

import (
	"time"
)

type Screening struct {
	ID                 uint `gorm:"primaryKey,foreignKey=screening_id" json:"id"`
	MovieMovieTypeId   *uint
	MovieMovieType     MovieMovieType `gorm:"foreignKey:MovieMovieTypeId" json:"mm_type"`
	MovieHallId        *uint          `json:"movie_hall_id"`
	MovieHall          MovieHall      `gorm:"foreignKey:MovieHallId" json:"movie_hall"`
	Start_of_screening time.Time      `json:"start_of_screening"`
}

type RequestScreening struct {
	ID                 uint      `json:"id"`
	MovieId            uint      `json:"movie_id"`
	MovieTitle         string    `json:"movie_title"`
	MovieType          string    `json:"movie_type"`
	Price              float64   `json:"price"`
	MovieHallId        uint      `json:"movie_hall_id"`
	MovieHallName      string    `json:"movie_hall_name"`
	Start_of_screening time.Time `json:"start_of_screening"`
}

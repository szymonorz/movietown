package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type MovieHallRepository struct {
	db *gorm.DB
}

func NewMovieHallRepository(database *gorm.DB) MovieHallRepository {
	return MovieHallRepository{db: database}
}

func (r *MovieHallRepository) Create(movieHall *model.MovieHall) error {
	result := r.db.Create(movieHall)
	return result.Error
}

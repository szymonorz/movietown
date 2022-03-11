package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type MovieRepository struct {
	db *gorm.DB
}

func NewMovieRepository(db *gorm.DB) MovieRepository {
	return MovieRepository{db: db}
}

func (r *MovieRepository) Create(movie *model.Movie) error {
	result := r.db.Create(movie)
	return result.Error
}

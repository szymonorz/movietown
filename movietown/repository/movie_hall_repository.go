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

func (r *MovieHallRepository) FindRowsByMovieHallId(movie_hall_id uint) ([]model.MovieHallRow, error) {
	var mrows []model.MovieHallRow
	err := r.db.Model(&model.MovieHallRow{MovieHallId: movie_hall_id}).
		Preload("Row.Seats").Find(&mrows).Error

	if err != nil {
		return nil, err
	}
	return mrows, nil
}

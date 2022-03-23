package repository

import (
	"time"

	"gorm.io/gorm"

	"movietown/model"
)

type ScreeningRepository struct {
	db *gorm.DB
}

func NewScreeningRepository(database *gorm.DB) ScreeningRepository {
	return ScreeningRepository{db: database}
}

func (r *ScreeningRepository) Create(screening *model.Screening) error {
	result := r.db.Create(screening)
	return result.Error
}

func (r *ScreeningRepository) FindById(id uint) (model.Screening, error) {
	var screening model.Screening
	err := r.db.Preload("Movie", "MovieHall").First(&screening, model.Screening{ID: id}).Error
	return screening, err
}

func (r *ScreeningRepository) FindByMovieId(movie_id uint, limit, offset int) ([]model.Screening, error) {
	var screenings []model.Screening
	err := r.db.Preload("Movie").Preload("MovieHall").
		Where("movie_id = ?", movie_id).
		Limit(limit).
		Offset(offset).
		Find(&screenings).Error
	return screenings, err
}

func (r *ScreeningRepository) FindBetween(from, to time.Time, limit, offset int) ([]model.Screening, error) {
	var screenings []model.Screening
	err := r.db.Preload("Movie").Preload("MovieHall").
		Where("start_of_screening between ? and ?", from, to).
		Limit(limit).
		Offset(offset).
		Find(&screenings).Error

	return screenings, err
}

func (r *ScreeningRepository) FindByMovieIdBetween(movie_id uint, from, to time.Time, limit, offset int) ([]model.Screening, error) {
	var screenings []model.Screening
	err := r.db.Preload("Movie", "MovieHall").
		Where("movie_id = ?", movie_id).
		Where("start_of_screening between ? and ?", from, to).
		Limit(limit).
		Offset(offset).
		Find(&screenings).Error
	return screenings, err
}

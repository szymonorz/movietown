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

func (r *ScreeningRepository) FindById(id uint) (model.RequestScreening, error) {
	var screening model.RequestScreening
	err := r.db.
		Model(model.Screening{}).
		Select(`
			screenings.id as id, movie_hall_id, start_of_screening, 
			movie_halls.name as movie_hall_name, movies.id as movie_id,
			movies.title as movie_title, movie_types.price as price, movie_types.type as movie_type
		`).
		Joins("JOIN movie_halls ON movie_halls.id = movie_hall_id").
		Joins("JOIN movie_movie_types mm_type ON mm_type.id = movie_movie_type_id").
		Joins("JOIN movies ON mm_type.movie_id = movies.id").
		Joins("JOIN movie_types ON mm_type.movie_type_id = movie_types.id").
		First(&screening, model.Screening{ID: id}).Error
	return screening, err
}

func (r *ScreeningRepository) FindBetween(from, to time.Time, limit, offset int) ([]model.RequestScreening, error) {
	var screenings []model.RequestScreening
	err := r.db.
		Model(model.Screening{}).
		Select(`
		screenings.id as id, movie_hall_id, start_of_screening, 
		movie_halls.name as movie_hall_name, movies.id as movie_id,
		movies.title as movie_title, movie_types.price as price, movie_types.type as movie_type
		`).
		Joins("JOIN movie_halls ON movie_halls.id = movie_hall_id").
		Joins("JOIN movie_movie_types mm_type ON mm_type.id = movie_movie_type_id").
		Joins("JOIN movies ON mm_type.movie_id = movies.id").
		Joins("JOIN movie_types ON mm_type.movie_type_id = movie_types.id").
		Where("start_of_screening between ? and ?", from, to).
		Limit(limit).
		Offset(offset).
		Find(&screenings).Error

	return screenings, err
}

func (r *ScreeningRepository) FindByMovieIdBetween(movie_id uint, from, to time.Time, limit, offset int) ([]model.RequestScreening, error) {
	var screenings []model.RequestScreening
	err := r.db.
		Model(model.Screening{}).
		Select(`
		screenings.id as id, movie_hall_id, start_of_screening, 
		movie_halls.name as movie_hall_name, movies.id as movie_id,
		movies.title as movie_title, movie_types.price as price, movie_types.type as movie_type
		`).
		Joins("JOIN movie_halls ON movie_halls.id = movie_hall_id").
		Joins("JOIN movie_movie_types mm_type ON mm_type.id = movie_movie_type_id").
		Joins("JOIN movies ON mm_type.movie_id = movies.id").
		Joins("JOIN movie_types ON mm_type.movie_type_id = movie_types.id").
		Where("mm_type.movie_id = ?", movie_id).
		Where("start_of_screening between ? and ?", from, to).
		Limit(limit).
		Offset(offset).
		Find(&screenings).Error
	return screenings, err
}

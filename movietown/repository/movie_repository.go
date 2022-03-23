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

func (r *MovieRepository) FindById(movie_id uint) (model.Movie, error) {
	var movie model.Movie
	err := r.db.Preload("MovieType").
		Where("id = ?", movie_id).
		First(&movie).Error
	return movie, err
}

func (r *MovieRepository) FindByNamePattern(pattern string, limit, offset int) ([]model.Movie, error) {
	var movies []model.Movie
	err := r.db.Preload("MovieType").
		Where("title like ?", pattern).
		Limit(limit).
		Offset(offset).
		Find(&movies).Error
	return movies, err
}

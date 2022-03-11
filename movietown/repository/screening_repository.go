package repository

import (
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
	result := r.db.Preload("Movie", "MovieHall").Find(&screening, model.Screening{ID: id})
	return screening, result.Error
}

package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type DiscountRepository struct {
	db *gorm.DB
}

func NewDiscountRepository(database *gorm.DB) DiscountRepository {
	return DiscountRepository{db: database}
}

func (r *DiscountRepository) FindAll() ([]model.DiscountType, error) {
	var discounts []model.DiscountType
	err := r.db.Find(&discounts).Error
	return discounts, err
}

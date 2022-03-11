package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type ReservationTypeRepository struct {
	db *gorm.DB
}

func NewReservationTypeRepository(database *gorm.DB) ReservationTypeRepository {
	return ReservationTypeRepository{db: database}
}

func (r *ReservationTypeRepository) Create(reservation_type *model.ReservationType) error {
	result := r.db.Create(reservation_type)
	return result.Error
}

func (r *ReservationTypeRepository) FindById(id uint) (model.ReservationType, error) {
	var reservation_type model.ReservationType
	result := r.db.Find(&reservation_type, model.ReservationType{ID: id})
	return reservation_type, result.Error
}

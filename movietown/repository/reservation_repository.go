package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type ReservationRepository struct {
	db *gorm.DB
}

func NewReservationRepository(database *gorm.DB) ReservationRepository {
	return ReservationRepository{db: database}
}

func (r *ReservationRepository) Create(reservation *model.Reservation) error {
	result := r.db.Model(&model.Reservation{}).Omit("Employee", "MovieHall", "ReservationType", "Screening").Create(reservation)
	return result.Error
}

func (r *ReservationRepository) FindById(id uint) (model.Reservation, error) {
	var reservation model.Reservation
	result := r.db.Find(&reservation, id)
	return reservation, result.Error
}

func (r *ReservationRepository) FindByCustomerId(customer_id uint) ([]model.Reservation, error) {
	var reservations []model.Reservation
	result := r.db.
		Preload("Screening").
		Preload("Screening.MovieMovieType").
		Preload("ReservationType").
		Preload("Screening.MovieMovieType.Movie").
		Preload("Screening.MovieMovieType.MovieType").
		Where(model.Reservation{CustomerId: &customer_id}).
		Find(&reservations)
	return reservations, result.Error
}

func (r *ReservationRepository) Delete(id uint) error {
	result := r.db.Delete(&model.Reservation{}, id)
	return result.Error
}

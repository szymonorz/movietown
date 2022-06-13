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
	return r.db.
		Model(&model.Reservation{}).
		Omit("MovieHall", "ReservationType", "Screening").
		Create(reservation).Error
}

func (r *ReservationRepository) FindById(id uint) (model.Reservation, error) {
	var reservation model.Reservation
	err := r.db.Find(&reservation, id).Error
	return reservation, err
}

func (r *ReservationRepository) FindByCustomerId(customer_id uint) ([]model.RequestReservation, error) {
	var reservations []model.RequestReservation
	err := r.db.
		Model(model.Reservation{}).
		Select(`
			reservations.id, movies.title as movie_title, movie_types.type as movie_type, movie_types.price as movie_type_price,
			screenings.start_of_screening as time_of_screening, reservation_types.type as reservation_type
		`).
		Joins("JOIN screenings ON screenings.id = screening_id").
		Joins("JOIN movie_movie_types mm_type ON mm_type.id = screenings.movie_movie_type_id").
		Joins("JOIN movies ON mm_type.movie_id = movies.id").
		Joins("JOIN movie_types ON mm_type.movie_type_id = movie_types.id").
		Joins("JOIN reservation_types ON reservation_types.id = reservation_type_id").
		Where(model.Reservation{CustomerId: &customer_id}).
		Find(&reservations).Error
	return reservations, err
}

func (r *ReservationRepository) Delete(id uint) error {
	return r.db.Delete(&model.Reservation{}, id).Error
}

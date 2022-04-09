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
	result := r.db.Preload("Customer").
		Preload("Screening").
		Preload("Screening.Movie").
		Preload("Screening.MovieHall").
		Where(model.Reservation{CustomerId: &customer_id}).
		Find(&reservations)
	return reservations, result.Error
}

func (r *ReservationRepository) FindByEmployeeId(employee_id uint) ([]model.Reservation, error) {
	var reservations []model.Reservation
	result := r.db.Find(&reservations, model.Reservation{Employee: model.Employee{ID: employee_id}})
	return reservations, result.Error
}

// func (r *ReservationRepository) FindByScreeningId(screening_id uint) ([]model.Reservation, error) {
// 	var reservations []model.Reservation
// 	r.db.T
// 	rows, err := r.db.Table("reservations").Where("reservations.screening_id = ?", screening_id).
// 		Joins("join screenings on screenings.id = screening_id").
// 		Joins("join movie_halls on movie_halls.id = screenings.movie_hall_id").
// 		Joins("join movie_movie_types on movie_movie_types.id = screenings.movie_id").
// 		Select(`reservations.id, reservations.customer_id, reservations.reserved, reservations.paid, reservations.active,
// 				screenings.start_of_screening,
// 				movies.title, movie_movie_types.director, movies.description, movies.length,
// 				movie_halls.name, movie_halls.number_of_seats`).Rows()
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer rows.Close()
// 	for rows.Next() {
// 		reservation := model.Reservation{}
// 		movie := model.Movie{}
// 		screening := model.Screening{}
// 		movie_hall := model.MovieHall{}
// 		err = rows.Scan(&reservation.ID, &reservation.CustomerId,
// 			&reservation.Reserved, &reservation.Paid, &reservation.Active,
// 			&screening.Start_of_screening,
// 			&movie.Title, &movie.Director, &movie.Description, &movie.Length,
// 			&movie_hall.Name, &movie_hall.Number_of_seats)
// 		if err != nil {
// 			return nil, err
// 		}
// 		reservation.Screening = screening
// 		reservation.Screening.Movie = movie
// 		reservation.Screening.MovieHall = movie_hall
// 		reservations = append(reservations, reservation)
// 	}

// 	return reservations, nil
// }

func (r *ReservationRepository) Delete(id uint) error {
	result := r.db.Delete(&model.Reservation{}, id)
	return result.Error
}

package repository

import (
	"errors"
	"log"
	"movietown/merror"
	"movietown/model"

	"gorm.io/gorm"
)

type ReservedSeatRepository struct {
	db *gorm.DB
}

func NewReservedSeatRepository(database *gorm.DB) ReservedSeatRepository {
	return ReservedSeatRepository{db: database}
}

func (r *ReservedSeatRepository) FindAllByScreeningId(screening_id uint) ([]model.ReservedSeat, error) {
	var reserved_seats []model.ReservedSeat
	err := r.db.
		Preload("Seat").
		Preload("MovieHallRow").
		Where("screening_id = ?", screening_id).
		Find(&reserved_seats).Error
	return reserved_seats, err
}

func (r *ReservedSeatRepository) FindAllByReservationId(reservation_id uint) ([]model.ReservedSeat, error) {
	var reserved_seats []model.ReservedSeat
	err := r.db.Preload("DiscountType").
		Where("reservation_id = ?", reservation_id).
		Find(&reserved_seats).Error
	return reserved_seats, err
}

func (r *ReservedSeatRepository) CreateForCustomer(
	seats []model.ReservedSeat,
	reservation *model.Reservation) error {
	tx := r.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			log.Printf("PANIC!")
			panic(r)
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	if err := tx.Model(&model.Reservation{}).Create(reservation).Error; err != nil {
		tx.Rollback()
		return err
	}

	var screening model.Screening
	if err := tx.Model(&model.Screening{}).
		Where("id = ?", reservation.ScreeningId).First(&screening).Error; err != nil {

		tx.Rollback()
		return err
	}

	for _, v := range seats {
		var tmps model.Seat
		if err := tx.Model(&model.Seat{}).Joins(`join rows on seats.row_id = rows.id 
										join movie_hall_rows on movie_hall_rows.row_id = rows.id`).
			Where("movie_hall_rows.movie_hall_id = ?", screening.MovieHallId).
			Where("seats.id = ?", v.SeatId).
			Where("movie_hall_rows.id = ?", v.MovieHallRowId).
			Find(&tmps).Error; err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			tx.Rollback()
			log.Println(err.Error())
			return err
		}

		if tmps.ID == 0 {
			tx.Rollback()
			return merror.ErrSeatNotExists
		}

		var tmp model.ReservedSeat
		if err := tx.Model(&model.ReservedSeat{}).
			Where("screening_id = ?", reservation.ScreeningId).
			Where("seat_id = ?", v.SeatId).Find(&tmp).Error; err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			tx.Rollback()
			return err
		}
		if tmp.ID != 0 {
			tx.Rollback()
			return merror.ErrSeatTaken
		}

	}
	for i := range seats {
		seats[i].ReservationId = reservation.ID
	}
	if err := tx.Model(&model.ReservedSeat{}).Create(seats).Error; err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit().Error
}

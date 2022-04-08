package repository

import (
	"errors"
	"log"
	"movietown/model"

	"gorm.io/gorm"
)

type ReservedSeatRepository struct {
	db *gorm.DB
}

func NewReservedSeatRepository(database *gorm.DB) ReservedSeatRepository {
	return ReservedSeatRepository{db: database}
}

func (r *ReservedSeatRepository) CreateForGuest(
	seats *[]model.ReservedSeat,
	guest *model.Customer,
	reservation *model.Reservation) error {

	tx := r.db.Begin()

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	if err := tx.Model(&model.Customer{}).Create(guest).Error; err != nil {
		tx.Rollback()
		return err
	}
	reservation.CustomerId = &guest.ID
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

	for _, v := range *seats {
		if err := tx.Model(&model.Seat{}).Where("movie_hall_id = ?", screening.MovieHallId).
			Where("id = ?", v.SeatId).First(&model.Seat{}).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	log.Printf("%d\n", reservation.ID)
	for i := range *seats {
		(*seats)[i].ReservationId = &reservation.ID
		log.Printf("%d\n", (*seats)[i].ReservationId)
	}
	if err := tx.Model(&model.ReservedSeat{}).Create(seats).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (r *ReservedSeatRepository) CreateForCustomer(
	seats *[]model.ReservedSeat,
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

	for _, v := range *seats {
		if err := tx.Model(&model.Seat{}).Where("movie_hall_id = ?", screening.MovieHallId).
			Where("id = ?", v.SeatId).First(&model.Seat{}).Error; !errors.Is(err, gorm.ErrRecordNotFound) {
			tx.Rollback()
			return err
		}

		if err := tx.Model(&model.ReservedSeat{}).
			Where("screening_id = ?", reservation.ScreeningId).
			Where("seat_id = ?", v.SeatId).First(&model.ReservedSeat{}).Error; !errors.Is(err, gorm.ErrRecordNotFound) {
			tx.Rollback()
			return err
		}
	}

	for _, v := range *seats {
		v.ReservationId = &reservation.ID
	}
	if err := tx.Model(&model.ReservedSeat{}).Create(seats).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

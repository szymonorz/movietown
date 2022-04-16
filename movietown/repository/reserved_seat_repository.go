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
	err := r.db.Where("screening_id = ?", screening_id).Find(&reserved_seats).Error
	return reserved_seats, err
}

func (r *ReservedSeatRepository) CreateForGuest(
	seats []model.ReservedSeat,
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

	log.Println("Everything went well :^)")
	for _, v := range seats {
		if err := tx.Model(&model.Seat{}).Where("movie_hall_id = ?", screening.MovieHallId).
			Where("id = ?", v.SeatId).First(&model.Seat{}).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	log.Printf("%d\n", reservation.ID)
	for i := range seats {
		seats[i].ReservationId = reservation.ID
	}
	if err := tx.Model(&model.ReservedSeat{}).Create(seats).Error; err != nil {
		tx.Rollback()
		return err
	}
	log.Println("Everything went well :^)")
	return tx.Commit().Error
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
		if err := tx.Model(&model.Seat{}).Where("movie_hall_id = ?", screening.MovieHallId).
			Where("id = ?", v.SeatId).Find(&tmps).Error; err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
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
		log.Println(seats[i].SeatId)
	}
	if err := tx.Model(&model.ReservedSeat{}).Create(seats).Error; err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit().Error
}

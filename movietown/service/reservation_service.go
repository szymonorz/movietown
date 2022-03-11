package service

import (
	"movietown/model"
	"movietown/repository"
	"log"
)

type ReservationService struct {
	repository repository.ReservationRepository
}

func NewReservationService(repository repository.ReservationRepository) ReservationService {
	return ReservationService{repository: repository}
}

func (rs *ReservationService) AddReservation(reservation model.Reservation) error {
	if err := rs.repository.Create(&reservation); err != nil {
		log.Printf("error: %v\n", err)
		return err
	}
	return nil
}

func (rs *ReservationService) GetCustomerReservations(customer_id uint) ([]model.Reservation, error) {
	reservations, err := rs.repository.FindByCustomerId(customer_id)
	if err != nil {
		log.Printf("error: %v\n", err)
		return nil, err
	}
	return reservations, nil
}

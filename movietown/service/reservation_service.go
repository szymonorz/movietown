package service

import (
	"movietown/model"
	"movietown/repository"
)

type ReservationService struct {
	repository repository.ReservationRepository
}

func NewReservationService(repository repository.ReservationRepository) ReservationService {
	return ReservationService{repository: repository}
}

func (rs *ReservationService) AddReservation(reservation *model.Reservation) error {
	return rs.repository.Create(reservation)
}

func (rs *ReservationService) GetCustomerReservations(customer_id uint) ([]model.Reservation, error) {
	return rs.repository.FindByCustomerId(customer_id)
}

package service

import (
	"log"
	"movietown/model"
	"movietown/repository"
)

type ReservedSeatService struct {
	repository repository.ReservedSeatRepository
}

func NewReservedSeatService(repository repository.ReservedSeatRepository) ReservedSeatService {
	return ReservedSeatService{repository: repository}
}

func (s *ReservedSeatService) GuestReserveSeats(seat_ids []uint, discount_id uint, customer *model.Customer, reservation *model.Reservation) ([]model.ReservedSeat, error) {
	var seats []model.ReservedSeat
	for _, seat := range seat_ids {
		log.Printf("%d %d\n", seat, discount_id)
		s := model.ReservedSeat{
			SeatId:         &seat,
			ScreeningId:    reservation.ScreeningId,
			DiscountTypeId: &discount_id,
		}
		seats = append(seats, s)
		log.Printf("%v\n", s)
	}

	hash, err := hashPassword(customer.Password)
	if err != nil {
		return nil, err
	}
	customer.Password = hash

	err = s.repository.CreateForGuest(&seats, customer, reservation)
	return seats, err
}

func (s *ReservedSeatService) RegularReserveSeats(seat_ids []uint, discount_id uint, reservation *model.Reservation) ([]model.ReservedSeat, error) {
	var seats []model.ReservedSeat
	for _, seat := range seat_ids {
		log.Printf("%d %d\n", seat, discount_id)
		s := model.ReservedSeat{
			SeatId:         &seat,
			ScreeningId:    reservation.ScreeningId,
			DiscountTypeId: &discount_id,
		}
		seats = append(seats, s)
		log.Printf("%v\n", s)
	}

	err := s.repository.CreateForCustomer(&seats, reservation)
	return seats, err
}

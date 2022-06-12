package service

import (
	"log"
	"movietown/merror"
	"movietown/model"
	"movietown/repository"
)

type ReservedSeatService struct {
	repository repository.ReservedSeatRepository
}

func NewReservedSeatService(repository repository.ReservedSeatRepository) ReservedSeatService {
	return ReservedSeatService{repository: repository}
}

func (s *ReservedSeatService) GetAllTakenSeatIds(screening_id uint) ([]model.RequestSeat, error) {
	return s.repository.FindAllByScreeningId(screening_id)
}

func (s *ReservedSeatService) GetAllSeatsFromReservations(reservation_id uint) ([]model.ReservedSeat, error) {
	return s.repository.FindAllByReservationId(reservation_id)
}

func (s *ReservedSeatService) RegularReserveSeats(seats []model.RequestSeat, discounts model.DiscountSeats, reservation *model.Reservation) error {
	var rseats []model.ReservedSeat
	normalSeatCount := discounts.NormalSeats
	childrenSeatCount := discounts.ChildrenSeats
	studentSeatCount := discounts.StudentSeats
	elderlySeatCount := discounts.ElderlySeats
	sum := normalSeatCount + childrenSeatCount + studentSeatCount + elderlySeatCount
	for _, seat := range seats {
		var discount_id uint
		if normalSeatCount != 0 {
			discount_id = 1
			normalSeatCount--
		} else if childrenSeatCount != 0 {
			discount_id = 2
			childrenSeatCount--
		} else if studentSeatCount != 0 {
			discount_id = 3
			studentSeatCount--
		} else if elderlySeatCount != 0 {
			discount_id = 4
			elderlySeatCount--
		}
		s := model.ReservedSeat{
			SeatId:         seat.ID,
			MovieHallRowId: seat.RowNumber,
			ScreeningId:    reservation.ScreeningId,
			DiscountTypeId: discount_id,
		}
		rseats = append(rseats, s)
	}
	log.Println(len(seats))
	if int(sum) != len(seats) {
		return merror.ErrNumberOfSeatsDontMatch
	}

	err := s.repository.CreateForCustomer(rseats, reservation)
	return err
}

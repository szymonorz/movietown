package service

import (
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

func (s *ReservedSeatService) GetAllTakenSeatIds(screening_id uint) ([]uint, error) {
	seats, err := s.repository.FindAllByScreeningId(screening_id)
	if err != nil {
		return nil, err
	}
	var seat_ids []uint
	for _, e := range seats {
		seat_ids = append(seat_ids, e.SeatId)
	}
	return seat_ids, nil
}

func (s *ReservedSeatService) GetAllSeatsFromReservations(reservation_id uint) ([]model.ReservedSeat, error) {
	return s.repository.FindAllByReservationId(reservation_id)
}

func (s *ReservedSeatService) RegularReserveSeats(seat_ids []uint, discounts model.RequestSeats, reservation *model.Reservation) error {
	var seats []model.ReservedSeat
	normalSeatCount := discounts.NormalSeats
	childrenSeatCount := discounts.ChildrenSeats
	studentSeatCount := discounts.StudentSeats
	elderlySeatCount := discounts.ElderlySeats
	sum := normalSeatCount + childrenSeatCount + studentSeatCount + elderlySeatCount
	for _, seat := range seat_ids {
		var discount_id uint
		// log.Println(seat)
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
		copy := new(uint)
		*copy = seat
		s := model.ReservedSeat{
			SeatId:         seat,
			ScreeningId:    reservation.ScreeningId,
			DiscountTypeId: discount_id,
		}
		seats = append(seats, s)
		// log.Println(*seats[i].SeatId)
	}
	if int(sum) != len(seats) {
		return merror.ErrNumberOfSeatsDontMatch
	}

	err := s.repository.CreateForCustomer(seats, reservation)
	return err
}

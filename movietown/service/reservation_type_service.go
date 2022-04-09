package service

import (
	"movietown/model"
	"movietown/repository"
)

type ReservationTypeService struct {
	repository repository.ReservationTypeRepository
}

func NewReservationTypeService(repository repository.ReservationTypeRepository) ReservationTypeService {
	return ReservationTypeService{repository: repository}
}

func (r *ReservationTypeService) GetReservationTypes() ([]model.ReservationType, error) {
	return r.repository.FindAll()
}

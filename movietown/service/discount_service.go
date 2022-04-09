package service

import (
	"movietown/model"
	"movietown/repository"
)

type DiscountService struct {
	repository repository.DiscountRepository
}

func NewDiscountService(repository repository.DiscountRepository) DiscountService {
	return DiscountService{repository: repository}
}

func (s *DiscountService) GetAllDiscounts() ([]model.DiscountType, error) {
	return s.repository.FindAll()
}

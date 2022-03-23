package service

import (
	"movietown/model"
	"movietown/repository"
	"time"
)

type ScreeningService struct {
	repository repository.ScreeningRepository
}

func NewScreeningService(repo repository.ScreeningRepository) ScreeningService {
	return ScreeningService{repository: repo}
}

func (s *ScreeningService) AddScreening(screening *model.Screening) error {
	return s.repository.Create(screening)
}

func (s *ScreeningService) GetMovieScreenings(movie_id uint, limit, offset int) ([]model.Screening, error) {
	return s.repository.FindByMovieId(movie_id, limit, offset)
}

func (s *ScreeningService) GetMovieScreeningsByTime(movie_id uint, from, to time.Time, limit, offset int) ([]model.Screening, error) {
	return s.repository.FindByMovieIdBetween(movie_id, from, to, limit, offset)
}

func (s *ScreeningService) GetScreeningsByTime(from, to time.Time, limit, offset int) ([]model.Screening, error) {
	return s.repository.FindBetween(from, to, limit, offset)
}

package service

import (
	"movietown/model"
	"movietown/repository"
)

type MovieHallService struct {
	repository repository.MovieHallRepository
}

func NewMovieHallService(repository repository.MovieHallRepository) MovieHallService {
	return MovieHallService{repository: repository}
}

func (s *MovieHallService) GetMovieHallRows(movie_hall_id uint) ([]model.MovieHallRow, error) {
	return s.repository.FindRowsByMovieHallId(movie_hall_id)
}

package service

import (
	"movietown/model"
	"movietown/repository"
)

type MovieService struct {
	repository repository.MovieRepository
}

func NewMovieService(repo repository.MovieRepository) MovieService {
	return MovieService{repository: repo}
}

func (s *MovieService) FindById(movie_id uint) (model.Movie, error) {
	return s.repository.FindById(movie_id)
}

func (s *MovieService) FindMovieImageURL(movie_id uint) (string, error) {
	return s.repository.FindMovieImageURL(movie_id)
}

func (s *MovieService) FindByPattern(pattern string, limit, offset int) ([]model.Movie, error) {
	p := "%" + pattern + "%"
	return s.repository.FindByNamePattern(p, limit, offset)
}

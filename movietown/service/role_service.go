package service

import (
	"movietown/model"
	"movietown/repository"
)

type RoleService struct {
	repository repository.RoleRepository
}

func NewRoleService(repository repository.RoleRepository) RoleService {
	return RoleService{repository: repository}
}

func (s *RoleService) GetAllRoles() ([]model.Role, error) {
	return s.repository.FindAllRoles()
}

func (s *RoleService) GetRoleById(id uint) (model.Role, error) {
	return s.repository.FindRoleById(id)
}

package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type RoleRepository struct {
	database *gorm.DB
}

func NewRoleRepository(database *gorm.DB) RoleRepository {
	return RoleRepository{database: database}
}

func (r *RoleRepository) FindAllRoles() ([]model.Role, error) {
	var roles []model.Role
	result := r.database.Find(&roles)
	return roles, result.Error
}

func (r *RoleRepository) FindRoleById(id uint) (model.Role, error) {
	var role model.Role
	result := r.database.Find(&role, id)
	return role, result.Error
}

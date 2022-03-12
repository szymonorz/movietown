package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type EmployeeRepository struct {
	db *gorm.DB
}

func NewEmployeeRepository(database *gorm.DB) EmployeeRepository {
	return EmployeeRepository{db: database}
}

func (r *EmployeeRepository) Create(employee *model.Employee) error {
	result := r.db.Create(employee)
	return result.Error
}

func (r *EmployeeRepository) FindEmployeeByUsername(username string) (*model.Employee, error) {
	var employee model.Employee
	result := r.db.Preload("Role").Find(&employee, "username = ?", username)
	return &employee, result.Error
}

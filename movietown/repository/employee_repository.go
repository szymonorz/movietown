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
	return r.db.Create(employee).Error
}

func (r *EmployeeRepository) FindEmployeeInfoByUsername(username string) (*model.EmployeeInfo, error) {
	var employee model.EmployeeInfo
	err := r.db.Table("employees").
		Preload("Role").
		First(&employee, "username = ?", username).Error
	return &employee, err
}

func (r *EmployeeRepository) FindEmployeeInfoById(id uint) (*model.EmployeeInfo, error) {
	var employee model.EmployeeInfo
	err := r.db.Table("employees").
		Preload("Role").
		First(&employee, "id = ?", id).Error
	return &employee, err
}

func (r *EmployeeRepository) FindEmployeeById(id uint) (*model.Employee, error) {
	var employee model.Employee
	err := r.db.Table("employees").
		Omit("Role").
		First(&employee, "id = ?", id).Error
	return &employee, err
}

func (r *EmployeeRepository) FindEmployeeByUsername(username string) (*model.Employee, error) {
	var employee model.Employee
	err := r.db.Preload("Role").Find(&employee, "username = ?", username).Error
	return &employee, err
}

func (r *EmployeeRepository) UpdateRole(employeeId, roleId uint) error {
	return r.db.Model(&model.Employee{}).
		Where("id = ?", employeeId).
		Update("role_id", roleId).Error
}

func (r *EmployeeRepository) UpdateEmployee(employee model.EmployeeInfo) error {
	return r.db.Model(&model.Employee{}).Where("id = ?", employee.ID).UpdateColumns(model.EmployeeInfo{
		Username:     employee.Username,
		Name:         employee.Name,
		Surname:      employee.Surname,
		Phone_number: employee.Phone_number,
		Email:        employee.Email,
	}).Error
}

func (r *EmployeeRepository) UpdateEmployeePassword(id uint, newpassword_hash string) error {
	return r.db.Model(&model.Employee{}).
		Where("id = ?", id).
		Update("password", newpassword_hash).Error
}

func (r *EmployeeRepository) DeleteEmployee(id uint) error {
	return r.db.Where("id = ?", id).Delete(&model.Employee{}).Error
}

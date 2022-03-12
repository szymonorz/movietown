package service

import (
	"errors"
	"movietown/model"
	"movietown/repository"
)

type EmployeeService struct {
	repository repository.EmployeeRepository
}

func NewEmployeeService(repository repository.EmployeeRepository) EmployeeService {
	return EmployeeService{repository: repository}
}

func (s *EmployeeService) AddNewEmployee(employee *model.Employee) error {
	hashedPassword, err := hashPassword(employee.Password)
	if err != nil {
		return err
	}
	employee.Password = hashedPassword
	return s.repository.Create(employee)
}

func (s *EmployeeService) FindEmployeeInfoByUsername(username string) (*model.EmployeeInfo, error) {
	return s.repository.FindEmployeeInfoByUsername(username)
}

func (s *EmployeeService) FindEmployeeInfoById(id uint) (*model.EmployeeInfo, error) {
	return s.repository.FindEmployeeInfoById(id)
}

func (s *EmployeeService) FindEmployeeById(id uint) (*model.Employee, error) {
	return s.repository.FindEmployeeById(id)
}

func (s *EmployeeService) FindEmployeeByUsernameAndPassword(username, password string) (*model.Employee, error) {
	employee, err := s.repository.FindEmployeeByUsername(username)
	if isValid := verifyPassword(password, employee.Password); !isValid {
		return nil, errors.New("invalid password")
	}
	return employee, err
}

func (s *EmployeeService) ChangeEmployeeRole(employeeId, newRoleId uint) error {
	return s.repository.UpdateRole(employeeId, newRoleId)
}

func (s *EmployeeService) UpdateEmployeeInfo(employee model.EmployeeInfo) error {
	return s.repository.UpdateEmployee(employee)
}

func (s *EmployeeService) UpdateEmployeePassword(employee model.Employee, current_password, new_password string) error {
	if current_password == new_password {
		return errors.New("new password cannot match old password")
	}
	if !verifyPassword(current_password, employee.Password) {
		return errors.New("invalid password")
	}
	new_hash, err := hashPassword(new_password)
	if err != nil {
		return err
	}
	return s.repository.UpdateEmployeePassword(employee.ID, new_hash)
}

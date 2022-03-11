package service

import (
	"movietown/model"
	"movietown/repository"
	"errors"
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

func (s *EmployeeService) FindEmployeeByUsernameAndPassword(username, password string) (*model.Employee, error) {
	employee, err := s.repository.FindEmployeeByUsername(username)
	if isValid := verifyPassword(password, employee.Password); !isValid {
		return nil, errors.New("invalid password")
	}
	return employee, err
}

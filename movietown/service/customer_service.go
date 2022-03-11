package service

import (
	"errors"
	"log"
	"movietown/model"
	"movietown/repository"
)

type CustomerService struct {
	repository repository.CustomerRepository
}

func NewCustomerService(repository repository.CustomerRepository) CustomerService {
	return CustomerService{repository: repository}
}

func (s *CustomerService) AddNewCustomer(customer *model.Customer) error {
	hashedPassword, err := hashPassword(customer.Password)
	if err != nil {
		return err
	}
	customer.Password = hashedPassword
	log.Println(customer.Password)
	return s.repository.Create(customer)
}

func (s *CustomerService) FindCustomerByUsernameAndPassword(username, password string) (*model.Customer, error) {
	customer, err := s.repository.FindCustomerByUsername(username)
	if isValid := verifyPassword(password, customer.Password); !isValid {
		return nil, errors.New("invalid password")
	}
	return customer, err
}

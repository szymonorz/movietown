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

func (s *CustomerService) FindCustomerById(id uint) (*model.Customer, error) {
	return s.repository.FindCustomerById(id)
}

func (s *CustomerService) FindCustomerInfoById(id uint) (*model.CustomerInfo, error) {
	return s.repository.FindCustomerInfoById(id)
}

func (s *CustomerService) UpdateCustomerInfo(customer model.CustomerInfo) error {
	return s.repository.UpdateCustomer(customer)
}

func (s *CustomerService) UpdateCustomerPassword(customer model.Customer, current_password, new_password string) error {
	if current_password == new_password {
		return errors.New("new password cannot match old password")
	}
	if !verifyPassword(current_password, customer.Password) {
		return errors.New("invalid password")
	}
	new_hash, err := hashPassword(new_password)
	if err != nil {
		return err
	}
	return s.repository.UpdateCustomerPassword(customer.ID, new_hash)
}

func (s *CustomerService) DeleteCustomer(id uint) error {
	return s.repository.DeleteCustomer(id)
}

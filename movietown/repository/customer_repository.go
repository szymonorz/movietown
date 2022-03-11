package repository

import (
	"movietown/model"

	"gorm.io/gorm"
)

type CustomerRepository struct {
	db *gorm.DB
}

func NewCustomerRepository(database *gorm.DB) CustomerRepository {
	return CustomerRepository{db: database}
}

func (r *CustomerRepository) Create(customer *model.Customer) error {
	result := r.db.Create(customer)
	return result.Error
}

func (r *CustomerRepository) FindCustomerById(id uint) (*model.Customer, error) {
	var customer model.Customer
	result := r.db.Find(&customer, id)
	return &customer, result.Error
}

func (r *CustomerRepository) FindCustomerByUsername(username string) (*model.Customer, error) {
	var customer model.Customer
	result := r.db.Find(&customer, "username = ?", username)
	return &customer, result.Error
}

func (r *CustomerRepository) Update(id uint, customer model.Customer) error {
	result := r.db.Where("id = ?", id).Updates(customer)
	return result.Error
}

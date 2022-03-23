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
	return r.db.Create(customer).Error
}

func (r *CustomerRepository) FindCustomerById(id uint) (*model.Customer, error) {
	var customer model.Customer
	err := r.db.Find(&customer, id).Error
	return &customer, err
}

func (r *CustomerRepository) FindCustomerInfoById(id uint) (*model.CustomerInfo, error) {
	var customer model.CustomerInfo
	err := r.db.Model(&model.Customer{}).Find(&customer, id).Error
	return &customer, err
}

func (r *CustomerRepository) FindCustomerByUsername(username string) (*model.Customer, error) {
	var customer model.Customer
	err := r.db.Find(&customer, "username = ?", username).Error
	return &customer, err
}

func (r *CustomerRepository) Update(id uint, customer model.Customer) error {
	err := r.db.Where("id = ?", id).Updates(customer).Error
	return err
}

func (r *CustomerRepository) UpdateCustomer(employee model.CustomerInfo) error {
	return r.db.Model(&model.Customer{}).Where("id = ?", employee.ID).UpdateColumns(model.CustomerInfo{
		Username:     employee.Username,
		Name:         employee.Name,
		Surname:      employee.Surname,
		Phone_number: employee.Phone_number,
		Email:        employee.Email,
	}).Error
}

func (r *CustomerRepository) UpdateCustomerPassword(id uint, newpassword_hash string) error {
	return r.db.Model(&model.Customer{}).
		Where("id = ?", id).
		Update("password", newpassword_hash).Error
}

func (r *CustomerRepository) DeleteCustomer(id uint) error {
	return r.db.Where("id = ?", id).Delete(&model.Customer{}).Error
}

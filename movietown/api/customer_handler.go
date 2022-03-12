package api

import (
	"movietown/auth"
	"movietown/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type CustomerHandler struct {
	auth      auth.AuthMiddleware
	validator validator.Validate
}

func NewCustomerHandler(auth auth.AuthMiddleware) CustomerHandler {
	return CustomerHandler{auth: auth, validator: *validator.New()}
}

type apiCustomerLogin struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

// Login customer godoc
// @Summary      Login as a customer
// @Description  Login as a customer and return AccessToken (not yet implemented)
// @Tags         customer
// @Accept       json
// @Produce      json
// @Param		 customer body apiCustomerLogin true "login customer DTO"
// @Success      200  	{object}  		model.Customer
// @Failure		 400  	{object}		map[string]interface{}
// @Router       /api/v1/customer/login [post]
func (h *CustomerHandler) LoginCustomer(c *gin.Context) {
	var req_customer apiCustomerLogin
	if err := c.Bind(&req_customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"login": "could not bind request body"})
		return
	}

	if err := h.validator.Struct(req_customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"login": "invalid request body"})
		return
	}

	customer, err := h.auth.CustomerService.FindCustomerByUsernameAndPassword(req_customer.Username, req_customer.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"login": "user not found"})
		return
	}

	pair, err := generateTokenPair(customer.ID, "customer")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, pair)

}

type apiCustomerRegister struct {
	apiCustomerLogin
	Email        string `json:"email" validate:"required"`
	Name         string `json:"name" validate:"required"`
	Surname      string `json:"surname" validate:"required"`
	Phone_number string `json:"phone_number" validate:"required"`
}

func getRegisterCustomer(req apiCustomerRegister) model.Customer {
	var customer model.Customer

	customer.Username = req.Username
	customer.Password = req.Password
	customer.Email = req.Email
	customer.Name = req.Name
	customer.Surname = req.Surname
	customer.Phone_number = req.Phone_number

	return customer
}

// RegisterNewCustomer godoc
// @Summary      Creates new customer
// @Description  register new customer
// @Tags         customer
// @Accept       json
// @Produce      json
// @Param		 customer body apiCustomerRegister true "create customer"
// @Success      200  {type}  		uint
// @Failure		 400  {object}		map[string]interface{}
// @Router       /api/v1/customer/register [post]
func (h *CustomerHandler) RegisterNewCustomer(c *gin.Context) {
	var req_customer apiCustomerRegister
	if err := c.Bind(&req_customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"register": "could not bind request body"})
		return
	}

	if err := h.validator.Struct(req_customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"register": "invalid request body"})
		return
	}

	customer := getRegisterCustomer(req_customer)
	err := h.auth.CustomerService.AddNewCustomer(&customer)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	pair, err := generateTokenPair(customer.ID, "customer")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, pair)

}

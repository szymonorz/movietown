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

// GetCustomerInfo godoc
// @Summary      Gets information about employee with specified username
// @Description  get customer's info from token
// @Tags         customer
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Success      200  {type}  		map[string]interface{}
// @Failure		 404  {object}		map[string]interface{}
// @Failure		 400  {object}		map[string]interface{}
// @Router       /api/v1/customer/info [get]
func (h *CustomerHandler) GetCustomerInfo(c *gin.Context) {
	customer, err := h.auth.GetCustomerInfoFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, customer)

}

type requestBody struct {
	Username     string `json:"username" validate:"required"`
	Name         string `json:"name" validate:"required"`
	Surname      string `json:"surname" validate:"required"`
	Email        string `json:"email" validate:"required"`
	Phone_number string `json:"phone_number" validate:"required"`
}

// UpdateCustomerInfo godoc
// @Summary      Updates cutomer's information
// @Description  update customer's info
// @Tags         customer
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 customer	body	requestBody true "updated employee information"
// @Success      200  {type}  		map[string]interface{}
// @Failure		 404  {object}		map[string]interface{}
// @Router       /api/v1/customer/info [put]
func (h *CustomerHandler) UpdateCustomerInfo(c *gin.Context) {
	var request requestBody
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	if err := h.validator.Struct(request); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	customer, err := h.auth.GetCustomerInfoFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err != nil {
		c.JSON(http.StatusNotFound, err)
	}
	customer.Username = request.Username
	customer.Name = request.Name
	customer.Surname = request.Surname
	customer.Email = request.Email
	customer.Phone_number = request.Phone_number

	err = h.auth.CustomerService.UpdateCustomerInfo(*customer)
	if err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"employee": "information has been updated succesfully"})
}

// Customer godoc
// @Summary      ChangePassword
// @Description  customer changes their own password by themselfs
// @Tags         customer
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 employee	body	changePasswordBody true "change employee password"
// @Success      200  {object}  		map[string]interface{}
// @Failure		 404  {object}		map[string]interface{}
// @Router       /api/v1/customer/password [put]
func (h *CustomerHandler) ChangeCustomerPassword(c *gin.Context) {
	var request changePasswordBody
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	customer, err := h.auth.GetCustomerFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = h.auth.CustomerService.UpdateCustomerPassword(*customer, request.OldPassword, request.NewPassword)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"password": "password changed succesfully"})
}

// DeleteCustomer godoc
// @Summary      Delete Customer
// @Description  Delete customer of sepcified id
// @Tags         customer
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Success      200  {object}  		map[string]interface{}
// @Failure		 404  {object}			map[string]interface{}
// @Router       /api/v1/customer/delete [delete]
func (h *CustomerHandler) DeleteCustomer(c *gin.Context) {
	customer, err := h.auth.GetCustomerFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	err = h.auth.CustomerService.DeleteCustomer(customer.ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"employee": "employee deleted succesfully"})
}

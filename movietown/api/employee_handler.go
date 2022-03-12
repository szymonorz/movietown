package api

import (
	"movietown/model"
	"movietown/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type EmployeeHandler struct {
	service   service.EmployeeService
	validator validator.Validate
}

func NewEmployeeHandler(service service.EmployeeService) EmployeeHandler {
	return EmployeeHandler{service: service, validator: *validator.New()}
}

type apiEmployeeLogin struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

// Login employee godoc
// @Summary      Login as an employee
// @Description  Login as a employee and return AccessToken (not yet implemented)
// @Tags         employee
// @Accept       json
// @Produce      json
// @Param		 employee body APIemployeeLogin true "login employee DTO"
// @Success      200  	{object}  		model.employee
// @Failure		 400  	{object}		map[string]interface{}
// @Router       /api/v1/employee/login [post]
func (h *EmployeeHandler) LoginEmployee(c *gin.Context) {
	var req_employee apiEmployeeLogin
	if err := c.Bind(&req_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"login": "could not bind request body"})
		return
	}

	if err := h.validator.Struct(req_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"login": "invalid request body"})
		return
	}

	employee, err := h.service.FindEmployeeByUsernameAndPassword(req_employee.Username, req_employee.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"login": "user not found"})
		return
	}
	pair, err := generateTokenPair(employee.ID, employee.Role.RoleName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, pair)

}

type apiEmployeeRegister struct {
	apiEmployeeLogin
	Email        string `json:"email" validate:"required"`
	Name         string `json:"name" validate:"required"`
	Surname      string `json:"surname" validate:"required"`
	Phone_number string `json:"phone_number" validate:"required"`
	RoleId       *uint  `json:"role_id" validate:"required"`
}

func getRegisterEmployee(req apiEmployeeRegister) model.Employee {
	var employee model.Employee

	employee.Username = req.Username
	employee.Password = req.Password
	employee.Email = req.Email
	employee.Name = req.Name
	employee.Surname = req.Surname
	employee.Phone_number = req.Phone_number
	employee.RoleId = req.RoleId

	return employee
}

// RegisterNewEmployee godoc
// @Summary      Creates new employee
// @Description  register new employee
// @Tags         employee
// @Accept       json
// @Produce      json
// @Param		 employee body APIemployeeRegister true "create employee"
// @Success      200  {type}  		uint
// @Failure		 400  {object}		map[string]interface{}
// @Router       /api/v1/employee/register [post]
func (h *EmployeeHandler) RegisterNewEmployee(c *gin.Context) {
	var req_employee apiEmployeeRegister
	if err := c.Bind(&req_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"register": "could not bind request body"})
		return
	}

	if err := h.validator.Struct(req_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"register": "invalid request body"})
		return
	}

	employee := getRegisterEmployee(req_employee)
	err := h.service.AddNewEmployee(&employee)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, employee.ID)

}

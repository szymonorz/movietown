package api

import (
	"movietown/auth"
	"movietown/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type EmployeeHandler struct {
	auth      auth.AuthMiddleware
	validator validator.Validate
}

func NewEmployeeHandler(auth auth.AuthMiddleware) EmployeeHandler {
	return EmployeeHandler{auth: auth, validator: *validator.New()}
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
// @Param		 employee body apiEmployeeLogin true "login employee DTO"
// @Success      200  	{object}  		model.Employee
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

	employee, err := h.auth.EmployeeService.FindEmployeeByUsernameAndPassword(req_employee.Username, req_employee.Password)
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
// @Param		 Authorization	header string true "Authorization"
// @Param		 employee body apiEmployeeRegister true "create employee"
// @Success      200  {type}  		uint
// @Failure		 400  {object}		map[string]interface{}
// @Router       /api/v1/employee/create [post]
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
	err := h.auth.EmployeeService.AddNewEmployee(&employee)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, employee.ID)

}

type changeRole struct {
	EmployeeId uint `json:"employee_id" validation:"required"`
	NewRoleId  uint `json:"new_role_id" validation:"required"`
}

// ChangeEmployeeRole godoc
// @Summary      Updates employees role
// @Description  update employee_id's role with
// @Tags         employee
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 employee body changeRole true "change employee's role"
// @Success      200  {type}  		map[string]interface{}
// @Failure		 404  {object}		map[string]interface{}
// @Router       /api/v1/employee/role [put]
func (h *EmployeeHandler) ChangeEmployeeRole(c *gin.Context) {

	var request changeRole
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	if err := h.validator.Struct(request); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	err := h.auth.EmployeeService.ChangeEmployeeRole(request.EmployeeId, request.NewRoleId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"role": "no such role"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"employee": "role changed succesfully"})

}

// GetEmployeeInfo godoc
// @Summary      Gets information about employee with specified username
// @Description  get employee's info
// @Tags         employee
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 username path string true "Employee's username"
// @Success      200  {type}  		map[string]interface{}
// @Failure		 404  {object}		map[string]interface{}
// @Failure		 400  {object}		map[string]interface{}
// @Router       /api/v1/employee/info/{username} [get]
func (h *EmployeeHandler) GetEmployeeInfo(c *gin.Context) {
	username := c.Param("username")
	if username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username cannot be empty"})
		return
	}
	employee, err := h.auth.EmployeeService.FindEmployeeInfoByUsername(username)
	if err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, employee)

}

// UpdateEmployeeInfo godoc
// @Summary      Updates employees information
// @Description  update employee's info
// @Tags         employee
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 employee	body	model.EmployeeInfo true "updated employee information"
// @Success      200  {type}  		map[string]interface{}
// @Failure		 404  {object}		map[string]interface{}
// @Router       /api/v1/employee/info [put]
func (h *EmployeeHandler) UpdateEmployeeInfo(c *gin.Context) {
	type requestBody struct {
		Id           *uint  `json:"id"`
		Username     string `json:"username" validate:"required"`
		Name         string `json:"name" validate:"required"`
		Surname      string `json:"surname" validate:"required"`
		Email        string `json:"email" validate:"required"`
		Phone_number string `json:"phone_number" validate:"required"`
	}
	var request requestBody
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	if err := h.validator.Struct(request); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	var employee *model.EmployeeInfo
	if request.Id == nil {
		emp, err := h.auth.GetEmployeeFromRequest(c.Request)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		request.Id = &emp.ID
	}
	employee, err := h.auth.EmployeeService.FindEmployeeInfoById(*request.Id)
	if err != nil {
		c.JSON(http.StatusNotFound, err)
	}
	employee.Username = request.Username
	employee.Name = request.Name
	employee.Surname = request.Surname
	employee.Email = request.Email
	employee.Phone_number = request.Phone_number

	err = h.auth.EmployeeService.UpdateEmployeeInfo(*employee)
	if err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"employee": "information has been updated succesfully"})
}

// ChangePassword godoc
// @Summary      ChangePassword
// @Description  Employee changes their own password by themselfs
// @Tags         employee
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 employee	body	changePasswordBody true "change employee password"
// @Success      200  {object}  		map[string]interface{}
// @Failure		 404  {object}		map[string]interface{}
// @Router       /api/v1/employee/password [put]
func (h *EmployeeHandler) ChangePassword(c *gin.Context) {
	var request changePasswordBody
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	employee, err := h.auth.GetEmployeeFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = h.auth.EmployeeService.UpdateEmployeePassword(*employee, request.OldPassword, request.NewPassword)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"password": "password changed succesfully"})
}

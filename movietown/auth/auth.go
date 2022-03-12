package auth

import (
	"fmt"
	"movietown/model"
	"movietown/service"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type AuthMiddleware struct {
	CustomerService service.CustomerService
	EmployeeService service.EmployeeService
}

func NewAuthMiddleware(customerService service.CustomerService, employeeService service.EmployeeService) AuthMiddleware {
	return AuthMiddleware{
		CustomerService: customerService,
		EmployeeService: employeeService,
	}
}

func (auth *AuthMiddleware) TokenValid(r *http.Request, secret string) (jwt.MapClaims, error) {
	token, err := auth.VerifyToken(r, secret)
	if err != nil {
		return nil, err
	}
	var claims jwt.MapClaims
	var ok bool
	if claims, ok = token.Claims.(jwt.MapClaims); !ok && !token.Valid {
		return nil, err
	}
	return claims, nil
}

func (auth *AuthMiddleware) VerifyToken(r *http.Request, secret string) (*jwt.Token, error) {
	tokenString := auth.extractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func (auth *AuthMiddleware) CustomerAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, err := auth.TokenValid(c.Request, "CustomerSecret")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		if claims["role"] != "customer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user unathorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func (auth *AuthMiddleware) EmployeeAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, err := auth.TokenValid(c.Request, "EmployeeSecret")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		id := claims["identitykey"].(float64)
		employee, err := auth.EmployeeService.FindEmployeeInfoById(uint(id))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		role := employee.Role.RoleName
		switch c.FullPath() {
		case "/api/v1/employee/create",
			"/api/v1/roles/all",
			"/api/v1/employee/role",
			"/api/v1/employee/delete/:id":
			if role != "manager" {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "employee unathorized to use this feature"})
				c.Abort()
				return
			}
		case "/api/v1/screening/create",
			"/api/v1/screening/sellTicket",
			"/api/v1/employee/info",
			"/api/v1/employee/password",
			"/api/v1/employee/info/:username":
			if role != "wagie" && role != "manager" {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "employee unathorized to use this feature"})
				c.Abort()
				return
			}
		default:
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user unathorized to use this feature"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func (auth *AuthMiddleware) GetEmployeeFromRequest(r *http.Request) (*model.Employee, error) {
	token, err := auth.VerifyToken(r, "EmployeeSecret")
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok && !token.Valid {
		return nil, err
	}
	id := claims["identitykey"].(float64)
	employee, err := auth.EmployeeService.FindEmployeeById(uint(id))
	if err != nil {
		return nil, err
	}
	return employee, nil
}

func (auth *AuthMiddleware) extractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

package auth

import (
	"fmt"
	"log"
	"movietown/model"
	"movietown/service"
	"net/http"
	"strings"

	"github.com/casbin/casbin/v2"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type AuthMiddleware struct {
	CustomerService service.CustomerService
	EmployeeService service.EmployeeService
	Enforcer        *casbin.Enforcer
}

func NewAuthMiddleware(customerService service.CustomerService,
	employeeService service.EmployeeService,
	enforcer *casbin.Enforcer) AuthMiddleware {
	return AuthMiddleware{
		CustomerService: customerService,
		EmployeeService: employeeService,
		Enforcer:        enforcer,
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
		_, err := auth.TokenValid(c.Request, "CustomerSecret")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
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

		ok, err := auth.Enforcer.Enforce(role, c.Request.URL.Path, c.Request.Method)
		if err != nil {
			log.Printf("%v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			c.Abort()
			return
		}
		if ok {
			c.Next()
			return
		} else {
			c.JSON(http.StatusForbidden, gin.H{"error": "user unathorized to use this feature"})
			c.Abort()
			return
		}
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

func (auth *AuthMiddleware) GetEmployeeInfoFromRequest(r *http.Request) (*model.EmployeeInfo, error) {
	token, err := auth.VerifyToken(r, "EmployeeSecret")
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok && !token.Valid {
		return nil, err
	}
	id := claims["identitykey"].(float64)
	employee, err := auth.EmployeeService.FindEmployeeInfoById(uint(id))
	if err != nil {
		return nil, err
	}
	return employee, nil
}

func (auth *AuthMiddleware) GetCustomerFromRequest(r *http.Request) (*model.Customer, error) {
	token, err := auth.VerifyToken(r, "CustomerSecret")
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok && !token.Valid {
		return nil, err
	}
	id := claims["identitykey"].(float64)
	customer, err := auth.CustomerService.FindCustomerById(uint(id))
	if err != nil {
		return nil, err
	}
	return customer, nil
}

func (auth *AuthMiddleware) GetCustomerInfoFromRequest(r *http.Request) (*model.CustomerInfo, error) {
	token, err := auth.VerifyToken(r, "CustomerSecret")
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok && !token.Valid {
		return nil, err
	}
	id := claims["identitykey"].(float64)
	customer, err := auth.CustomerService.FindCustomerInfoById(uint(id))
	if err != nil {
		return nil, err
	}
	return customer, nil
}

func (auth *AuthMiddleware) extractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

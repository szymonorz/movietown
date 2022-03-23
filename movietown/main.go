package main

import (
	"log"
	"movietown/api"
	"movietown/auth"
	"movietown/database"
	"movietown/repository"
	"movietown/service"

	_ "movietown/docs"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/gorm"
)

func InitializeReservationHandler(database *gorm.DB) api.ReservationHandler {
	reservationRepo := repository.NewReservationRepository(database)
	reservationService := service.NewReservationService(reservationRepo)
	return api.NewReservationHandler(reservationService)
}

func InitializeCustomerHandler(auth auth.AuthMiddleware) api.CustomerHandler {
	return api.NewCustomerHandler(auth)
}

func InitializeEmployeeHandler(auth auth.AuthMiddleware) api.EmployeeHandler {
	return api.NewEmployeeHandler(auth)
}

func InitializeAuthMiddleware(database *gorm.DB) auth.AuthMiddleware {
	employeeRepo := repository.NewEmployeeRepository(database)
	employeeServce := service.NewEmployeeService(employeeRepo)
	customerRepo := repository.NewCustomerRepository(database)
	customerService := service.NewCustomerService(customerRepo)
	return auth.NewAuthMiddleware(customerService, employeeServce)
}

// @title           MovieTown API
// @version         0.1-alpha
// @description     This is a mistake.

// @host      localhost:4000
// @BasePath  /
func main() {
	postgresString := "postgres://postgres:postgres@localhost:5432/movietown"
	var db *gorm.DB
	var err error
	if db, err = database.InitPostgresConnection(postgresString); err != nil {
		log.Fatalf("error: %v", err)
	}

	_ = InitializeReservationHandler(db)
	auth := InitializeAuthMiddleware(db)
	customerHandler := InitializeCustomerHandler(auth)
	employeeHandler := InitializeEmployeeHandler(auth)

	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	//router.Use(gin.Logger())
	router.Use(CORSMiddleware())

	v1 := router.Group("/api/v1")
	{
		customerApi := v1.Group("/customer")
		{
			customerApi.POST("/login", customerHandler.LoginCustomer)
			customerApi.POST("/register", customerHandler.RegisterNewCustomer)
			customerApi.Use(auth.CustomerAuthMiddleware())
			customerApi.PUT("/info", customerHandler.UpdateCustomerInfo)
			customerApi.GET("/info", customerHandler.GetCustomerInfo)
			customerApi.PUT("/password", customerHandler.ChangeCustomerPassword)
			customerApi.DELETE("/delete", customerHandler.DeleteCustomer)
		}
		employeeApi := v1.Group("/employee")
		{
			employeeApi.POST("/login", employeeHandler.LoginEmployee)
			employeeApi.Use(auth.EmployeeAuthMiddleware())
			employeeApi.POST("/create", employeeHandler.RegisterNewEmployee)
			employeeApi.GET("/info/:username", employeeHandler.GetEmployeeInfo)
			employeeApi.PUT("/role", employeeHandler.ChangeEmployeeRole)
			employeeApi.PUT("/info", employeeHandler.UpdateEmployeeInfo)
			employeeApi.PUT("/password", employeeHandler.ChangePassword)
			employeeApi.DELETE("/delete/:id", employeeHandler.DeleteEmployee)
		}
	}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	log.Fatal(router.Run(":4000"))

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

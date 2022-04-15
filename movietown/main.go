package main

import (
	"log"
	"movietown/api"
	"movietown/auth"
	"movietown/database"
	"movietown/repository"
	"movietown/service"

	_ "movietown/docs"

	"github.com/casbin/casbin/v2"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/gorm"
)

func IntitializeMovieHandler(database *gorm.DB) api.MovieHandler {
	movieRepo := repository.NewMovieRepository(database)
	movieService := service.NewMovieService(movieRepo)
	return api.NewMovieHandler(movieService)
}

func InitializeScreeningHandler(database *gorm.DB) api.ScreeningHandler {
	screeningRepo := repository.NewScreeningRepository(database)
	screeningService := service.NewScreeningService(screeningRepo)
	return api.NewScreeningHandler(screeningService)
}

func InitializeReservationHandler(database *gorm.DB, auth auth.AuthMiddleware) api.ReservationHandler {
	reservedSeatRepo := repository.NewReservedSeatRepository(database)
	reservedSeatService := service.NewReservedSeatService(reservedSeatRepo)
	reservationRepo := repository.NewReservationRepository(database)
	reservationService := service.NewReservationService(reservationRepo)
	customerRepo := repository.NewCustomerRepository(database)
	customerService := service.NewCustomerService(customerRepo)
	return api.NewReservationHandler(reservationService, customerService, reservedSeatService, auth)
}

func InitializeCustomerHandler(auth auth.AuthMiddleware) api.CustomerHandler {
	return api.NewCustomerHandler(auth)
}

func InitializeEmployeeHandler(auth auth.AuthMiddleware) api.EmployeeHandler {
	return api.NewEmployeeHandler(auth)
}

func InitializeAuthMiddleware(database *gorm.DB, enforcer *casbin.Enforcer) auth.AuthMiddleware {
	employeeRepo := repository.NewEmployeeRepository(database)
	employeeServce := service.NewEmployeeService(employeeRepo)
	customerRepo := repository.NewCustomerRepository(database)
	customerService := service.NewCustomerService(customerRepo)
	return auth.NewAuthMiddleware(customerService, employeeServce, enforcer)
}

func InitializeReservationTypeHandler(database *gorm.DB) api.ReservationTypeHandler {
	reservationTypeRepo := repository.NewReservationTypeRepository(database)
	reservationTypeService := service.NewReservationTypeService(reservationTypeRepo)
	return api.NewReservationTypeHandler(reservationTypeService)
}

func InitializeDiscountHandler(database *gorm.DB) api.DiscountHandler {
	discountRepo := repository.NewDiscountRepository(database)
	discountService := service.NewDiscountService(discountRepo)
	return api.NewDiscountHandler(discountService)
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
	authEnforcer, err := casbin.NewEnforcer("./config/auth.conf", "./config/policy.csv")
	if err != nil {
		log.Fatal(err)
	}

	auth := InitializeAuthMiddleware(db, authEnforcer)
	screeningHandler := InitializeScreeningHandler(db)
	movieHandler := IntitializeMovieHandler(db)
	customerHandler := InitializeCustomerHandler(auth)
	employeeHandler := InitializeEmployeeHandler(auth)
	reservationHandler := InitializeReservationHandler(db, auth)
	reservationTypeHandler := InitializeReservationTypeHandler(db)
	discountHandler := InitializeDiscountHandler(db)

	gin.SetMode(gin.DebugMode)
	router := gin.Default()
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
			employeeApi.GET("/info", employeeHandler.GetCurrentEmployeeInfo)
			employeeApi.GET("/info/:username", employeeHandler.GetEmployeeInfo)
			employeeApi.PUT("/role", employeeHandler.ChangeEmployeeRole)
			employeeApi.PUT("/info", employeeHandler.UpdateEmployeeInfo)
			employeeApi.PUT("/password", employeeHandler.ChangePassword)
			employeeApi.DELETE("/delete/:id", employeeHandler.DeleteEmployee)
		}
		movieApi := v1.Group("/movies")
		{
			movieApi.GET("/", movieHandler.GetMovies)
			movieApi.GET("/:movie_id", movieHandler.GetMovieInfo)
		}
		screeningApi := v1.Group("/screening")
		{
			screeningApi.GET("/:movie_id", screeningHandler.GetMovieScreeningsByTime)
			screeningApi.GET("/", screeningHandler.GetScreeningsByTime)
			screeningApi.GET("/s/:id", screeningHandler.GetScreeningById)
			screeningApi.Use(auth.EmployeeAuthMiddleware())
			screeningApi.POST("/add", screeningHandler.AddScreening)
		}

		reservationApi := v1.Group("/reservations")
		{
			reservationApi.GET("/", reservationHandler.GetCustomerReservations)
			reservationApi.GET("/:customer_id", auth.EmployeeAuthMiddleware(), reservationHandler.GetCustomerReservationsFromId)
			reservationApi.POST("/employee/create", auth.EmployeeAuthMiddleware(), reservationHandler.EmployeeCreateReservation)
			reservationApi.POST("/customer/create", auth.CustomerAuthMiddleware(), reservationHandler.CustomerCreateReservation)
			reservationApi.POST("/guest/create", reservationHandler.GuestCreateReservation)
			reservationApi.GET("/types", reservationTypeHandler.GetReservationTypes)
			reservationApi.GET("/discounts", discountHandler.GetAllDiscounts)
			reservationApi.GET("/seats/:screening_id", reservationHandler.GetReservedSeatsForScreening)
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

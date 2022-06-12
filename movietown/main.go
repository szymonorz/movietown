package main

import (
	"fmt"
	"log"
	"movietown/api"
	"movietown/auth"
	"movietown/database"
	_ "movietown/docs"
	"movietown/repository"
	"movietown/service"
	"os"

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

func InitializeMovieHallHandler(database *gorm.DB) api.MovieHallHandler {
	movieHallRepo := repository.NewMovieHallRepository(database)
	movieHallService := service.NewMovieHallService(movieHallRepo)
	return api.NewMovieHallHandler(movieHallService)
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

func InitializeAuthMiddleware(database *gorm.DB) auth.AuthMiddleware {
	customerRepo := repository.NewCustomerRepository(database)
	customerService := service.NewCustomerService(customerRepo)
	return auth.NewAuthMiddleware(customerService)
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
	db_host := os.Getenv("DB_HOST")
	db_port := os.Getenv("DB_PORT")
	db_name := os.Getenv("DB_NAME")
	postgresString := fmt.Sprintf("postgres://postgres:postgres@%s:%s/%s", db_host, db_port, db_name)
	var db *gorm.DB
	var err error
	if db, err = database.InitPostgresConnection(postgresString); err != nil {
		log.Fatalf("error: %v", err)
	}

	auth := InitializeAuthMiddleware(db)
	screeningHandler := InitializeScreeningHandler(db)
	movieHandler := IntitializeMovieHandler(db)
	customerHandler := InitializeCustomerHandler(auth)
	reservationHandler := InitializeReservationHandler(db, auth)
	reservationTypeHandler := InitializeReservationTypeHandler(db)
	discountHandler := InitializeDiscountHandler(db)
	movieHallHandler := InitializeMovieHallHandler(db)

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
		movieApi := v1.Group("/movies")
		{
			movieApi.GET("/", movieHandler.GetMovies)
			movieApi.GET("/:movie_id", movieHandler.GetMovieInfo)
			movieApi.GET("/:movie_id/image", movieHandler.GetMovieImageURL)
			movieApi.GET("/latest", movieHandler.GetLatestMovies)
		}
		screeningApi := v1.Group("/screening")
		{
			screeningApi.GET("/:movie_id", screeningHandler.GetMovieScreeningsByTime)
			screeningApi.GET("/", screeningHandler.GetScreeningsByTime)
			screeningApi.GET("/seats/:movie_hall_id", movieHallHandler.GetRows)
			screeningApi.GET("/s/:id", screeningHandler.GetScreeningById)
			screeningApi.POST("/add", screeningHandler.AddScreening)
		}

		reservationApi := v1.Group("/reservations")
		{
			reservationApi.GET("/", reservationHandler.GetCustomerReservations)
			reservationApi.POST("/customer/create", auth.CustomerAuthMiddleware(), reservationHandler.CustomerCreateReservation)
			reservationApi.GET("/types", reservationTypeHandler.GetReservationTypes)
			reservationApi.GET("/discounts", discountHandler.GetAllDiscounts)
			reservationApi.GET("/seats/:screening_id", reservationHandler.GetReservedSeatsForScreening)
		}
	}

	router.Static("/image", "./static/images")
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

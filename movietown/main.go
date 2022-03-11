package main

import (
	"log"
	"movietown/api"
	"movietown/database"
	"movietown/repository"
	"movietown/service"

	_ "movietown/docs"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/gorm"
)

// @title           MovieTown API
// @version         0.1-alpha
// @description     This is a mistake.

// @host      localhost:4000
// @BasePath  /

// @securityDefinitions.basic  BasicAuth
func main() {
	postgresString := "postgres://postgres:postgres@localhost:5432/postgres"
	var db *gorm.DB
	var err error
	if db, err = database.InitPostgresConnection(postgresString); err != nil {
		log.Fatalf("error: %v", err)
	}
	// reservationRepo := repository.NewReservationRepository(db)
	// reservationService := service.NewReservationService(reservationRepo)
	// movieRepo = repository.NewMovieRepository(db)
	// movieHallRepo = repository.NewMovieHallRepository(db)
	// screeningRepo = repository.NewScreeningRepository(db)
	// reservationTypeRepo = repository.NewReservationTypeRepository(db)
	// reservationHandler := api.NewReservationHandler(reservationService)

	customerRepo := repository.NewCustomerRepository(db)
	customerService := service.NewCustomerService(customerRepo)
	customerHandler := api.NewCustomerHandler(customerService)
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	router.Use(gin.Logger())

	v1 := router.Group("/api/v1")
	{
		customerApi := v1.Group("/customer")
		{
			customerApi.POST("/login", customerHandler.Login)
			customerApi.POST("/register", customerHandler.RegisterNewCustomer)
		}
	}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run(":4000")

}

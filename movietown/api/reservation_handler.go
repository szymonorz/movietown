package api

import (
	"errors"
	"math"
	"movietown/auth"
	"movietown/merror"
	"movietown/model"
	"movietown/service"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type ReservationHandler struct {
	reservationService  service.ReservationService
	customerService     service.CustomerService
	reservedSeatService service.ReservedSeatService
	auth                auth.AuthMiddleware
}

func NewReservationHandler(reservationService service.ReservationService,
	customerService service.CustomerService,
	reservedSeatService service.ReservedSeatService,
	auth auth.AuthMiddleware) ReservationHandler {
	return ReservationHandler{
		reservationService:  reservationService,
		customerService:     customerService,
		reservedSeatService: reservedSeatService,
		auth:                auth,
	}
}

type takenSeats struct {
	SeatIds []uint `json:"taken_seat_ids"`
}

// GetReservedSeatsForScreening godoc
// @Summary      Show reserved seats for screening
// @Description  get takenSeats by customer_id
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param        screening_id    path     string  false  "search reserved seats for screening_id"  Format(int)
// @Success      200  {object}  takenSeats
// @Router       /api/v1/reservations/seats/{screening_id} [get]
func (h *ReservationHandler) GetReservedSeatsForScreening(c *gin.Context) {
	screening_id, err := strconv.ParseUint(c.Param("screening_id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	seats, err := h.reservedSeatService.GetAllTakenSeatIds(uint(screening_id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	var ts takenSeats
	ts.SeatIds = seats

	c.JSON(http.StatusOK, ts)
}

type reservationResponse struct {
	ID              uint    `json:"id"`
	SeatCount       uint    `json:"seat_count"`
	MovieTitle      string  `json:"movie_title"`
	MovieType       string  `json:"movie_type"`
	TimeOfScreening string  `json:"time_of_screening"`
	ReservationType string  `json:"reservation_type"`
	Price           float64 `json:"price"`
}

// GetCustomerReservations godoc
// @Summary      Show reservations
// @Description  get []reservationResponse by customer_id from token
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Success      200  {object}  []reservationResponse
// @Router       /api/v1/reservations [get]
func (h *ReservationHandler) GetCustomerReservations(c *gin.Context) {
	customer, err := h.auth.GetCustomerInfoFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var response []reservationResponse
	reservations, _ := h.reservationService.GetCustomerReservations(customer.ID)
	for _, reservation := range reservations {
		var tmp reservationResponse
		tmp.ID = reservation.ID
		tmp.MovieTitle = reservation.Screening.MovieMovieType.Movie.Title
		tmp.MovieType = reservation.Screening.MovieMovieType.MovieType.Type
		tmp.TimeOfScreening = reservation.Screening.Start_of_screening.Format(time.RFC3339)
		tmp.ReservationType = reservation.ReservationType.Type
		seats, err := h.reservedSeatService.GetAllSeatsFromReservations(reservation.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		tmp.SeatCount = uint(len(seats))
		tmp.Price = calcPrice(seats, reservation.Screening.MovieMovieType.MovieType)
		response = append(response, tmp)
	}
	c.JSON(http.StatusOK, response)
}

func calcPrice(seats []model.ReservedSeat, movie_type model.MovieType) float64 {
	var price float64
	for _, s := range seats {
		price += movie_type.Price - (movie_type.Price * (float64(s.DiscountType.Discount) * 0.01))
	}
	return math.Round(price/0.01) * 0.01
}

// GetCustomerReservationsFromId godoc
// @Summary      Show reservations
// @Description  get []Reservation by customer_id
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param        customer_id    query     string  false  "reservation search by customer_id"  Format(int)
// @Success      200  {object}  model.Reservation
// @Router       /api/v1/reservations/customer/{customer_id} [get]
func (h *ReservationHandler) GetCustomerReservationsFromId(c *gin.Context) {
	customer_id, err := strconv.ParseUint(c.Param("customer_id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	reservation, err := h.reservationService.GetCustomerReservations(uint(customer_id))
	if err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusAccepted, reservation)
}

type customerReservation struct {
	SeatsId           []uint             `json:"seat_ids" validate:"required"`
	ScreeningId       uint               `json:"screening_id" validate:"required"`
	ReservationTypeId uint               `json:"reservation_type_id" validate:"required"`
	Discounts         model.RequestSeats `json:"discounts"`
}

type customerGuestReservation struct {
	customerReservation
	apiCustomerRegister
}

// CustomerCreateReservation godoc
// @Summary      Customer makes a seat reservation for screening
// @Description  make reservation as a customer
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 guestReservation body 	customerReservation true "guest reservation DTO"
// @Success      200  integer	int
// @Router       /api/v1/reservations/customer/create [post]
func (h *ReservationHandler) CustomerCreateReservation(c *gin.Context) {
	customer, err := h.auth.GetCustomerFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var request customerReservation
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	reservation := model.Reservation{
		ScreeningId:       request.ScreeningId,
		ReservationTypeId: request.ReservationTypeId,
		CustomerId:        &customer.ID,
	}
	err = h.reservedSeatService.RegularReserveSeats(request.SeatsId, request.Discounts, &reservation)
	if err != nil {
		if errors.Is(err, merror.ErrSeatTaken) {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
		if errors.Is(err, merror.ErrNumberOfSeatsDontMatch) {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, reservation.ID)
}

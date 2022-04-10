package api

import (
	"movietown/auth"
	"movietown/model"
	"movietown/service"
	"net/http"
	"strconv"

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

// GetCustomerReservations godoc
// @Summary      Show reservations
// @Description  get []Reservation by customer_id
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param        customer_id    query     string  false  "reservation search by customer_id"  Format(int)
// @Success      200  {object}  model.Reservation
// @Router       /api/v1/reservations [get]
func (h *ReservationHandler) GetCustomerReservations(c *gin.Context) {
	customer, err := h.auth.GetCustomerInfoFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	reservation, _ := h.reservationService.GetCustomerReservations(customer.ID)
	c.JSON(http.StatusAccepted, reservation)
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
	SeatsId           []uint             `json:"seats_id" validate:"required"`
	ScreeningId       uint               `json:"screening_id" validate:"required"`
	ReservationTypeId uint               `json:"reservation_type_id" validate:"required"`
	Discounts         model.RequestSeats `json:"discounts"`
}

type customerGuestReservation struct {
	customerReservation
	apiCustomerRegister
}

// GuestCreateReservation godoc
// @Summary      Show reservations
// @Description  make reservation as a guest
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param		 guestReservation body 	customerGuestReservation true "guest reservation DTO"
// @Success      200  {array}  []model.ReservedSeat
// @Router       /api/v1/reservations/guest/create [post]
func (h *ReservationHandler) GuestCreateReservation(c *gin.Context) {
	var request customerGuestReservation
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	customer := model.Customer{
		Name:         request.Name,
		Surname:      request.Surname,
		Username:     request.Username,
		Email:        request.Email,
		Password:     request.Password,
		Phone_number: request.Phone_number,
	}
	reservation := model.Reservation{
		ScreeningId:       &request.ScreeningId,
		Reserved:          true,
		Active:            true,
		ReservationTypeId: &request.ReservationTypeId,
	}
	seats, err := h.reservedSeatService.GuestReserveSeats(request.SeatsId, request.Discounts, &customer, &reservation)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, seats)
}

// CustomerCreateReservation godoc
// @Summary      Customer makes a seat reservation for screening
// @Description  make reservation as a customer
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 guestReservation body 	customerReservation true "guest reservation DTO"
// @Success      200  {array}  []model.ReservedSeat
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
		ScreeningId:       &request.ScreeningId,
		ReservationTypeId: &request.ReservationTypeId,
		CustomerId:        &customer.ID,
	}
	seats, err := h.reservedSeatService.RegularReserveSeats(request.SeatsId, request.Discounts, &reservation)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, seats)
}

// GuestCreateReservation godoc
// @Summary      Employee makes a reservation for a customer
// @Description  reservation
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param		 Authorization	header string true "Authorization"
// @Param		 guestReservation body 	customerReservation true "customer reservation DTO"
// @Success      200  {array}  []model.ReservedSeat
// @Router       /api/v1/reservations/employee/create [post]
func (h *ReservationHandler) EmployeeCreateReservation(c *gin.Context) {
	employee, err := h.auth.GetEmployeeFromRequest(c.Request)
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
		ScreeningId:       &request.ScreeningId,
		ReservationTypeId: &request.ReservationTypeId,
		EmployeeId:        &employee.ID,
	}

	seats, err := h.reservedSeatService.RegularReserveSeats(request.SeatsId, request.Discounts, &reservation)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, seats)

	//TODO
}

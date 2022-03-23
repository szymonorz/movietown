package api

import (
	"movietown/auth"
	"movietown/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ReservationHandler struct {
	service service.ReservationService
	auth    auth.AuthMiddleware
}

func NewReservationHandler(service service.ReservationService) ReservationHandler {
	return ReservationHandler{service: service}
}

// Ping godoc
// @Summary      Show reservations
// @Description  get []Reservation by customer_id
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param        customer_id    query     string  false  "reservation search by customer_id"  Format(int)
// @Success      200  {object}  model.Reservation
// @Router       /v1/customer/reservations [get]
func (h *ReservationHandler) GetCustomerReservations(c *gin.Context) {
	customer, err := h.auth.GetCustomerInfoFromRequest(c.Request)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	reservation, _ := h.service.GetCustomerReservations(customer.ID)
	c.JSON(http.StatusAccepted, reservation)
}

// Ping godoc
// @Summary      Show reservations
// @Description  get []Reservation by customer_id
// @Tags         reservations
// @Accept       json
// @Produce      json
// @Param        customer_id    query     string  false  "reservation search by customer_id"  Format(int)
// @Success      200  {object}  model.Reservation
// @Router       /v1/customer/reservations/{customer_id} [get]
func (h *ReservationHandler) GetCustomerReservationsFromId(c *gin.Context) {
	customer_id, err := strconv.ParseUint(c.Param("customer_id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	reservation, err := h.service.GetCustomerReservations(uint(customer_id))
	if err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}
	c.JSON(http.StatusAccepted, reservation)
}

package api

import (
	"movietown/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ReservationHandler struct {
	service service.ReservationService
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
// @Router       /ping/{customer_id} [get]
func (h *ReservationHandler) Ping(c *gin.Context) {
	customer_id, err := strconv.ParseUint(c.Param("customer_id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
	}
	reservation, _ := h.service.GetCustomerReservations(uint(customer_id))
	c.JSON(http.StatusAccepted, reservation)
}

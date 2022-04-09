package api

import (
	"movietown/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ReservationTypeHandler struct {
	service service.ReservationTypeService
}

func NewReservationTypeHandler(service service.ReservationTypeService) ReservationTypeHandler {
	return ReservationTypeHandler{service: service}
}

// GetReservationTypes godoc
// @Summary      Show reservations types
// @Description  Show reservations types
// @Tags         reservations
// @Produce      json
// @Success      200  {array}  []model.ReservationType
// @Router       /api/v1/reservations/types [get]
func (h *ReservationTypeHandler) GetReservationTypes(c *gin.Context) {
	types, err := h.service.GetReservationTypes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, types)
}

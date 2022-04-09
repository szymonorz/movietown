package api

import (
	"movietown/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DiscountHandler struct {
	service service.DiscountService
}

func NewDiscountHandler(service service.DiscountService) DiscountHandler {
	return DiscountHandler{service: service}
}

// GetAllDiscounts godoc
// @Summary      Shows all discount available
// @Description  Shows all discount available
// @Tags         reservations
// @Success      200  {array}  []model.DiscountType
// @Router       /api/v1/reservations/discounts [get]
func (h *DiscountHandler) GetAllDiscounts(c *gin.Context) {
	discounts, err := h.service.GetAllDiscounts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, discounts)
}

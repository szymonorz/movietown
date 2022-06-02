package api

import (
	"movietown/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MovieHallHandler struct {
	service service.MovieHallService
}

func NewMovieHallHandler(service service.MovieHallService) MovieHallHandler {
	return MovieHallHandler{service: service}
}

// GetRows godoc
// @Summary      Returns rows for movie_hall_id
// @Description  get []model.MovieHallRow by movie_hall_id
// @Tags         movie_hall_rows
// @Accept       json
// @Produce      json
// @Param        movie_hall_id    path     int  false  "rows in movie_hall_id"  Format(int)
// @Success      200  {object}  []model.MovieHallRow
// @Router       /api/v1/screening/seats/{movie_hall_id} [get]
func (h *MovieHallHandler) GetRows(c *gin.Context) {
	movie_hall_id, err := strconv.ParseUint(c.Param("movie_hall_id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	rows, err := h.service.GetMovieHallRows(uint(movie_hall_id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, rows)
}

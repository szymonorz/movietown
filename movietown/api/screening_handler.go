package api

import (
	"movietown/model"
	"movietown/service"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type ScreeningHandler struct {
	service   service.ScreeningService
	validator validator.Validate
}

func NewScreeningHandler(service service.ScreeningService) ScreeningHandler {
	return ScreeningHandler{service: service, validator: *validator.New()}
}

// GetScreeningsByTime godoc
// @Summary      Show screenings
// @Description  get []Screening
// @Tags         screening
// @Accept       json
// @Produce      json
// @Param        from    query     string  false  "first"
// @Param 		 to    query     string  false  "second"
// @Param 		 page    query     int  false  "page"
// @Param 		 offset    query     int  false  "offset"
// @Success      200  {object}  []model.Screening
// @Router       /api/v1/screening [get]
func (h *ScreeningHandler) GetScreeningsByTime(c *gin.Context) {
	page, err := strconv.ParseInt(c.Query("page"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	offset, err := strconv.ParseInt(c.Query("offset"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	from, err := time.Parse(time.RFC3339, c.Query("from"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	to, err := time.Parse(time.RFC3339, c.Query("to"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	screenings, err := h.service.GetScreeningsByTime(from, to, int(page), int(offset))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, screenings)
}

// GetMovieScreeningsByTime godoc
// @Summary      Show screenings
// @Description  get []Screening by movie_id
// @Tags         screening
// @Accept       json
// @Produce      json
// @Param        movie_id    path     int  false  "screening search by movie_id"  Format(int)
// @Param        from    query     string  false  "first"
// @Param 		 to    query     string  false  "second"
// @Param 		 page    query     int  false  "page"
// @Param 		 offset    query     int  false  "offset"
// @Success      200  {object}  []model.Screening
// @Router       /api/v1/screening/{movie_id} [get]
func (h *ScreeningHandler) GetMovieScreeningsByTime(c *gin.Context) {
	page, err := strconv.ParseInt(c.Query("page"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	offset, err := strconv.ParseInt(c.Query("offset"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	from, err := time.Parse(time.RFC3339, c.Query("from"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	to, err := time.Parse(time.RFC3339, c.Query("to"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	movie_id, err := strconv.ParseUint(c.Param("movie_id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	screenings, err := h.service.GetMovieScreeningsByTime(uint(movie_id), from, to, int(page), int(offset))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, screenings)
}

type newScreening struct {
	MovieId            uint      `json:"movie_id" validate:"required"`
	MovieHallId        uint      `json:"movie_hall_id" validate:"required"`
	Start_of_screening time.Time `json:"start_of_screening" validate:"required"`
}

// Add screening godoc
// @Summary      Add new screening
// @Description  Boss is able to add a new screening
// @Tags         screening
// @Accept       json
// @Produce      json
// @Param		 Authorization header	string true "Authorization"
// @Param		 screening body newScreening true "add screening DTO"
// @Success      200  	{object}        string
// @Failure		 400  	{object}		map[string]interface{}
// @Router       /api/v1/screening/add [post]
func (h *ScreeningHandler) AddScreening(c *gin.Context) {
	var request newScreening
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.validator.Struct(request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	screening := model.Screening{
		MovieId:            &request.MovieId,
		MovieHallId:        &request.MovieHallId,
		Start_of_screening: request.Start_of_screening,
	}

	err := h.service.AddScreening(&screening)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": screening.ID})
}

package api

import (
	"movietown/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MovieHandler struct {
	service service.MovieService
}

func NewMovieHandler(service service.MovieService) MovieHandler {
	return MovieHandler{service: service}
}

// GetMovies godoc
// @Summary      Show movies
// @Description  get []model.Movie
// @Tags         movie
// @Accept       json
// @Produce      json
// @Param		 title	query		string false "title"
// @Param 		 page    query     int  false  "page"
// @Param 		 offset    query     int  false  "offset"
// @Success      200  {object}  []model.Movie
// @Router       /api/v1/movies [get]
func (h *MovieHandler) GetMovies(c *gin.Context) {
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
	pattern := c.Query("title")
	movies, err := h.service.FindByPattern(pattern, int(page), int(offset))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, movies)
}

// GetMovieInfo godoc
// @Summary      Show movie info
// @Description  get []model.Movie
// @Tags         movie
// @Accept       json
// @Produce      json
// @Param 		 movie_id    path     int  false  "movie_id"
// @Success      200  {object}  model.Movie
// @Router       /api/v1/movies/{movie_id} [get]
func (h *MovieHandler) GetMovieInfo(c *gin.Context) {
	movie_id, err := strconv.ParseUint(c.Param("movie_id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	movie, err := h.service.FindById(uint(movie_id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, movie)
}

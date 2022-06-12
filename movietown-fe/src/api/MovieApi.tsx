import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/movies"
})

export interface movie_type {
    price: number,
    type: string
}

export interface movie {
    id: number,
    title: string,
    director: string,
    description: string,
    length: number,
    url: string,
    movie_types: movie_type[]
}

export const getQueriedMovies = (query: string, limit: number = 5, offset: number = 0) => {
    return instance.get("/", {
        params: {
            title: query,
            limit: limit,
            offset: offset
        }
    })
}

export const getMovieImageUrl = (movie_id: number) => {
    return instance.get(`/${movie_id}/image`)
}

export const getMovieById = (id: number) => {
    return instance.get(`/${id}`)
}
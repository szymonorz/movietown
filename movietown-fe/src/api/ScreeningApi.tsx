import axios from 'axios'
import { movie, movie_type } from './MovieApi'


export interface screeningParams {
    from: Date,
    to: Date
}

interface mm_type{
    id: number,
    movie: movie,
    movie_type: movie_type
}

export interface movie_hall{
    name: string,
    number_of_seats: number
}

export interface screening{
    mm_type: mm_type,
    movie_hall: movie_hall,
    start_of_screening: Date,
}

const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/screening"
})

export const getScreeningById = async (id: number) => {
    return await instance.get(`/s/${id}`)
}

export const getDaysScreenings = async ({from, to}: screeningParams, limit: number = 5, offset: number = 0) => {
    return await instance.get("/", {
        params: {
            from: from,
            to: to,
            limit: limit,
            offset: offset
        }
    })
}
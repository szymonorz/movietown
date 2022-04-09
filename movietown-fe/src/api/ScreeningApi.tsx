import axios from 'axios'
import { movie } from '../components/MovieCard'


export interface screeningParams {
    from: Date,
    to: Date
}

interface movie_hall{
    name: string,
    number_of_seats: number
}

export interface screening{
    movie: movie,
    movie_hall: movie_hall,
    start_of_screening: Date,
}

const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/screening"
})


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
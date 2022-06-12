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
    id: number,
    name: string,
    number_of_seats: number
}

export interface screening{
    id: number,
    mm_type: mm_type,
    movie_hall: movie_hall,
    start_of_screening: Date,
}

export interface seat{
    id: number,
    row_number: number,
    row_id: number,
    seat_number: number
}

export interface row {
    id: number,
    seat_limit: number,
    seats: seat[]
}

export interface movie_hall_row {
    id: number,
    row_id: number,
    row: row,
    movie_hall_id: number,
    row_number: number
}

export interface request_screening {
   id: number,
   movie_id: number,
   movie_title: string,
   movie_type: string,
   price: number,
   movie_hall_id: number,
   movie_hall_name: string,
   start_of_screening: Date
}

const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/screening"
})


export const getDates = (date: Date): [Date, Date] => {
    const today = new Date()     
    const d = today.getDay() === date!.getDay() ? today : date!
    const to = new Date(d)
    to.setDate(d.getDate() + 1)
    to.setHours(0)
    to.setMinutes(0)
    to.setSeconds(0)
    to.setMilliseconds(0)
    if(d.getDay() !== today.getDay()){
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        d.setMilliseconds(0)
    }

    return [d as Date, to]
}

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

export const getSeatsInMovieHall = async (movieHallId: number) => {
    return await instance.get(`/seats/${movieHallId}`)
}

export const getScreeningByMovieId = async (movieId: number, {from, to}: screeningParams, limit: number = 5, offset: number = 0) => {
    return await instance.get(`/${movieId}`, {
        params: {
            from: from,
            to: to,
            limit: limit,
            offset: offset
        }
    })
}
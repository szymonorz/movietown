import axios from 'axios'
import React, { createContext } from 'react'
import { seat } from './ScreeningApi'


const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/reservations"
})

export interface discounts {
    normal_seats: number,
    children_seats: number,
    student_seats: number,
    elderly_seats: number
}

export interface customerReservation {
    seats: seat[],
    screening_id: number,
    reservation_type_id: number,
    discounts: discounts,
    seatsToChoose: number
}

export interface discount {
    id: number,
    type: string,
    discount: number
}

export interface reservation {
    id: number,
    seat_count: number,
    movie_title: string,
    movie_type: string,
    time_of_screening: string,
    reservation_type: string,
    price: number
}

export interface IAMGOINGTOLOSEMYFUCKINGMIND{
    customerReservation: customerReservation,
    setCustomerReservation: React.Dispatch<React.SetStateAction<customerReservation>>
}

export const CustomerReservationContext = createContext<IAMGOINGTOLOSEMYFUCKINGMIND | null>(null)

export const getReservationTypes = async () => {
    return await instance.get("/types");
}

export const getDiscounts = async () => {
    return await instance.get("/discounts")
}

export const getTakenSeats = async(screeningId: number) => {
    return await instance.get(`/seats/${screeningId}`)
}

export const createReservation = async (token: string, values: customerReservation) => {
    return await instance.post("/customer/create", {
        seats: values.seats,
        screening_id: values.screening_id,
        reservation_type_id: values.reservation_type_id,
        discounts: values.discounts,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getCustomerReservations = async (token: string) => {
    return await instance.get("", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

import axios from 'axios'
import React, { createContext } from 'react'


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
    seat_ids: number[],
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

export interface seat{
    id: number,
    row: number,
    col: number,
    movie_hall_id: number
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

export const createReservation = async (token: string, values: customerReservation) => {
    return await instance.post("/customer/create", {
        seat_ids: values.seat_ids,
        screening_id: values.screening_id,
        reservation_type_id: values.reservation_type_id,
        discounts: values.discounts,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

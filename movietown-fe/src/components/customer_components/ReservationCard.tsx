import { makeStyles } from '@material-ui/core'
import React from 'react'
import {reservation} from '../../api/ReservationApi'

interface ReservationCardProps {
    reservation: reservation
}

const useStyles = makeStyles(() => ({
    container: {
        color: "white",
        borderBottom: "1px solid #444",
        textAlign: "left",
        padding: "10px"
    }
}))

const ReservationCard: React.FC<ReservationCardProps> = ({reservation}) => {
    const {container} = useStyles()
    return <div className={container}>
        <div>Tytuł: {reservation.movie_title}</div>
        <div>Typ filmu: {reservation.movie_type}</div>
        <div>Seans: {reservation.time_of_screening}</div>
        <div>Rezerwacja: {reservation.reservation_type}</div>
        <div>Ilość zarezerwowanych miejsc: {reservation.seat_count}</div>
        <div>Cena: {reservation.price}</div>
    </div>
}

export default ReservationCard
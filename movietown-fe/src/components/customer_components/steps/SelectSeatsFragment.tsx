import React, { useContext, useEffect, useState } from 'react'
import { CustomerReservationContext, discounts } from '../../../api/ReservationApi'
import SeatsGrid from './SeatsGrid'

interface SelectSeatsFragmentProps {
    numberOfSeats: number,
}

const SelectSeatsFragment: React.FC<SelectSeatsFragmentProps> = ({ numberOfSeats }) => {
    const provider = useContext(CustomerReservationContext)
    const seats = provider!.customerReservation.seatsToChoose

    useEffect(() => {
        console.log(provider!.customerReservation)
    },[])

    return (
        <div>
            {seats ? (
                <div>Ilość miejsc do wybrania: {seats}</div>
            ) : (
                <div>Wybrano wszystkie miejsca, przejdz dalej</div>
            )}
            <SeatsGrid numberOfSeats={numberOfSeats}/>
        </div>
    )
}

export default SelectSeatsFragment
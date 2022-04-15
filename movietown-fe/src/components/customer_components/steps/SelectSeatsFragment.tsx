import React, { useContext, useEffect } from 'react'
import { CustomerReservationContext } from '../../../api/ReservationApi'
import SeatsGrid from './steps_components/SeatsGrid'

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
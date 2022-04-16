import React, { useContext, useEffect } from 'react'
import { CustomerReservationContext } from '../../../api/ReservationApi'
import SeatsGrid from './steps_components/SeatsGrid'

interface SelectSeatsFragmentProps {
    numberOfSeats: number,
    setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectSeatsFragment: React.FC<SelectSeatsFragmentProps> = ({ setNextDisabled, numberOfSeats }) => {
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
            <SeatsGrid setNextDisabled={setNextDisabled} numberOfSeats={numberOfSeats}/>
        </div>
    )
}

export default SelectSeatsFragment
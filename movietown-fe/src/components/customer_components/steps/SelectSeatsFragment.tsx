import React, { useContext, useEffect } from 'react'
import { CustomerReservationContext } from '../../../api/ReservationApi'
import SeatsGrid from './steps_components/SeatsGrid'

interface SelectSeatsFragmentProps {
    movieHallId: number,
    setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectSeatsFragment: React.FC<SelectSeatsFragmentProps> = ({ setNextDisabled, movieHallId }) => {
    const provider = useContext(CustomerReservationContext)
    const seats = provider!.customerReservation.seatsToChoose

    return (
        <div>
            {seats ? (
                <div>Ilość miejsc do wybrania: {seats}</div>
            ) : (
                <div>Wybrano wszystkie miejsca, przejdz dalej</div>
            )}
            <SeatsGrid setNextDisabled={setNextDisabled} movieHallId={movieHallId}/>
        </div>
    )
}

export default SelectSeatsFragment
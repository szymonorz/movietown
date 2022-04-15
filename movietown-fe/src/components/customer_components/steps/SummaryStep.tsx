import { Divider } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { CustomerReservationContext, discount, getDiscounts } from '../../../api/ReservationApi'
import { screening } from '../../../api/ScreeningApi'

interface SummaryStepProps {
    screening: screening
}

const SummaryStep: React.FC<SummaryStepProps> = ({ screening }) => {
    const provider = useContext(CustomerReservationContext)
    const [discountTypes, setDiscountTypes] = useState<discount[]>([])
    const price = screening.mm_type.movie_type.price
    const seats = provider!.customerReservation.discounts
    useEffect(() => {
        getDiscounts()
            .then(({ data }) => setDiscountTypes([...data]))
            .catch((err) => console.error(err))
    }, [])

    const getSum = () => {
        let sum = 0
        discountTypes.forEach((dt, index) => {
            let seat = 0
            switch (index) {
                case 0:
                    seat = seats.normal_seats
                    break
                case 1:
                    seat = seats.student_seats
                    break
                case 2:
                    seat = seats.children_seats
                    break
                case 3:
                    seat = seats.elderly_seats
                    break
                default:
                    break
            }

            sum = sum + (price - (dt.discount * 0.01 * price)) * seat
        })

        return sum.toFixed(2)
    }
    return (
        <div>
            {discountTypes.map((dt, index) => {
                let seat
                switch (index) {
                    case 0:
                        seat = seats.normal_seats
                        break
                    case 1:
                        seat = seats.student_seats
                        break
                    case 2:
                        seat = seats.children_seats
                        break
                    case 3:
                        seat = seats.elderly_seats
                        break
                    default:
                        break
                }
                return (
                    <div>{dt.type} {(price - (dt.discount * 0.01 * price)).toFixed(2)} PLN x {seat}</div>
                )
            })}
            <Divider />
            <div>Podsumowanie: {getSum()} PLN</div>
        </div>
    )
}

export default SummaryStep
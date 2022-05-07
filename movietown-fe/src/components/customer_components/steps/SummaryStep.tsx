import { Divider, makeStyles, Button } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { createReservation, CustomerReservationContext, discount, getDiscounts } from '../../../api/ReservationApi'
import { screening } from '../../../api/ScreeningApi'
import TicketList from './steps_components/TicketList'

interface SummaryStepProps {
    screening: screening,
    setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    setReservationId: React.Dispatch<React.SetStateAction<number | null>>
}

const useStyles = makeStyles(() => ({
    parent: {
        display: "flex"
    },
    list: {
        marginLeft: "10%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "15%"
    },
    element: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "left",
        columnGap: "0.5em"
    },
    input: {
        color: "white",
        '&:disabled': {
            color: "grey"
        }
    }
}))

const SummaryStep: React.FC<SummaryStepProps> = ({ setNextDisabled, screening, setReservationId }) => {
    const { parent, list, element, input } = useStyles()
    const provider = useContext(CustomerReservationContext)
    const [discountTypes, setDiscountTypes] = useState<discount[]>([])
    const [error, setError] = useState<string | null>(null)
    const price = screening.mm_type.movie_type.price
    const seats = provider!.customerReservation.discounts
    useEffect(() => {
        setNextDisabled(true)
        getDiscounts()
            .then(({ data }) => setDiscountTypes([...data]))
            .catch((err) => setError(err.response.data))
    }, [])

    const makeReservation = () => {
        const token = localStorage.getItem("token") || ""
        createReservation(token, provider!.customerReservation)
            .then(({ data }) => setReservationId(data))
            .catch((err) => setError(err.response.data["error"]))
    }

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

    const renderBoughtSeatsWithDiscountTypes = () => {
        return discountTypes.map((dt, index) => {
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
            return (<div>
                {seat ? (
                    <div className={element}>
                        <div>{dt.type}</div>
                        <div> {(price - (dt.discount * 0.01 * price)).toFixed(2)}  PLN </div>
                        <div> x {seat}</div>
                    </div>
                ) : (<div></div>)}
            </div>
            )
        })
    }

    return (
        <div>
            <div className={parent}>
                <TicketList seat_ids={provider!.customerReservation.seat_ids} />
                <div className={list}>
                    {renderBoughtSeatsWithDiscountTypes()}
                </div>
            </div>
            <Divider />
            <div>Podsumowanie: {getSum()} PLN</div>
            <Button className={input} onClick={() => makeReservation()}>Złóż zamówienie</Button>
            {error && (
                <div>
                    Coś poszło nie tak :^(
                    <div>{JSON.stringify(error)}</div>
                </div>
            )}
        </div>
    )
}

export default SummaryStep
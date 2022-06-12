import { Grid, Typography, TextField, makeStyles } from '@material-ui/core';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { customerReservation, CustomerReservationContext } from '../../../api/ReservationApi';
import { request_screening, screening } from '../../../api/ScreeningApi';
import DiscountForm from './steps_components/DiscountForm';


interface ChooseMovieTypeProps {
    screening: request_screening,
    setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>

}

const useStyles = makeStyles(() => ({
    input: {
        color: "white"
    }
}))

const ReservationSeatsFragment: React.FC<ChooseMovieTypeProps> = ({ setNextDisabled, screening,  }) => {
    const {input} = useStyles()
    const provider = useContext(CustomerReservationContext)
    const discountSeats = provider!.customerReservation.discounts
    const getNumberOfSeats = () => {
        const sum = +discountSeats.normal_seats
            + +discountSeats.children_seats
            + +discountSeats.student_seats
            + +discountSeats.elderly_seats
        return sum
    }

    const [numberOfSeats, setNumberOfSeats] = useState<number>(getNumberOfSeats())
    const [startString, setStartString] = useState("")


    useEffect(() => {
        const date = new Date(screening.start_of_screening)
        setStartString(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`)
    }, [screening])

    useEffect(() => {
        const sum = +discountSeats.normal_seats
            + +discountSeats.children_seats
            + +discountSeats.student_seats
            + +discountSeats.elderly_seats
        setNumberOfSeats(sum)
        if(sum) setNextDisabled(false)
        else setNextDisabled(true)
    }, [discountSeats])

    useEffect(() => {
        provider!.setCustomerReservation(prev => {
            return {
                ...prev,
                seat_ids: [],
                seatsToChoose: numberOfSeats
            }
        })

    }, [numberOfSeats])


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography>
                        Tytuł: {screening.movie_title}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>
                        Data i godzina rozpoczęcia:
                    </Typography>
                    {startString}
                </Grid>
                <Grid item xs={4}>
                    <Typography>
                        Sala: {screening.movie_hall_name}
                    </Typography>
                    <Typography>
                        Rodzaj: {screening.movie_type}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    Ilosc miejsc:
                    <div>
                        <TextField
                            className={input}
                            value={numberOfSeats}
                            type='number'
                            InputProps={{ inputProps: { min: 0 }, className: input }}
                            onChange={(e) => {

                                setNumberOfSeats(parseInt(e.currentTarget.value))
                                const number = parseInt(e.currentTarget.value)
                                provider!.setCustomerReservation((prev: customerReservation) => {
                                    return {
                                        ...prev,
                                        discounts: {
                                            normal_seats: number,
                                            children_seats: 0,
                                            student_seats: 0,
                                            elderly_seats: 0
                                        },
                                        seatsToChoose: number
                                    }
                                })
                            }
                            }
                        />
                    </div>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <DiscountForm setNumberOfSeats={setNumberOfSeats} />
                </Grid>
            </Grid>
        </div>
    )
}

export default ReservationSeatsFragment
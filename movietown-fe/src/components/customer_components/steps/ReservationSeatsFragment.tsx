import { Grid, Typography, TextField } from '@material-ui/core';
import { privateDecrypt } from 'crypto';
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { customerReservation, discounts, CustomerReservationContext } from '../../../api/ReservationApi';
import { getScreeningById, screening } from '../../../api/ScreeningApi';
import DiscountForm from './steps_components/DiscountForm';


interface ChooseMovieTypeProps {
    customerReservation: customerReservation,
    setCustomerReservation: (arg: customerReservation) => void

}

const ReservationSeatsFragment: React.FC<ChooseMovieTypeProps> = ({ customerReservation, setCustomerReservation }) => {
    const [screeningId, setScreeningId] = useState(0)
    const [screening, setScreening] = useState<screening>({
        mm_type: {
            id: 0,
            movie: {
                id: 0,
                title: '',
                director: '',
                description: '',
                length: 0,
                movie_types: []
            },
            movie_type: {
                price: 0,
                type: ''
            }
        },
        movie_hall: {
            name: '',
            number_of_seats: 0
        },
        start_of_screening: new Date(),
    })
    const [startString, setStartString] = useState("")
    const provider = useContext(CustomerReservationContext)
    const [numberOfSeats, setNumberOfSeats] = useState<number>(0)
    const discountSeats = provider!.customerReservation.discounts
    const [query] = useSearchParams()
    useEffect(() => {
        const id = query.get("id")
        if (id) {
            setScreeningId(parseInt(id))
        }
    }, [])

    useEffect(() => {
        setCustomerReservation({
            ...customerReservation,
            screening_id: screeningId
        })
        getScreeningById(screeningId)
            .then(({ data }) => setScreening(data))
            .catch((err) => console.error(err))
    }, [screeningId])

    useEffect(() => {
        console.log("yeeehaw")
        setCustomerReservation({
            ...customerReservation,
            discounts: discountSeats
        })
    }, [discountSeats])

    useEffect(() => {
        const date = new Date(screening.start_of_screening)
        setStartString(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`)
    }, [screening])

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography>
                        Tytuł: {screening.mm_type.movie.title}
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
                        Sala: {screening.movie_hall.name}
                    </Typography>
                    <Typography>
                        Rodzaj: {screening.mm_type.movie_type.type}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    Ilosc miejsc:
                    <div>
                        <TextField
                            value={numberOfSeats}
                            type='number'
                            onChange={(e) => {
                               
                                setNumberOfSeats(parseInt(e.currentTarget.value))
                                const number = parseInt(e.currentTarget.value)
                                provider!.setCustomerReservation((prev: customerReservation) => {
                                    // console.log("pain")
                                    return {
                                        ...prev,
                                        discounts: {
                                            normal_seats: number,
                                            children_seats: 0,
                                            student_seats: 0,
                                            elderly_seats: 0
                                        }
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
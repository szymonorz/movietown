import { Grid, Typography, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movie, movie_type } from '../../../api/MovieApi';
import { getScreeningById, screening, movie_hall } from '../../../api/ScreeningApi';
import DiscountForm from './steps_components/DiscountForm';


const ChooseMovieType: React.FC<{}> = () => {
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
    const [numberOfSeats, setNumberOfSeats] = useState('')
    const [query] = useSearchParams()
    useEffect(() => {
        const id = query.get("id")
        if (id) {
            setScreeningId(parseInt(id))
        }
    }, [])

    useEffect(() => {
        getScreeningById(screeningId)
            .then(({ data }) => setScreening(data))
            .catch((err) => console.error(err))
    }, [screeningId])

    useEffect(() => {
        const date = new Date(screening.start_of_screening)
        setStartString(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`)
    }, [screening])

    // const generateSelectList = (n: number) => {

    //     var i:number = 0;
    //     const indents = []
    //     if(n>100){
    //         return []
    //     }
    //     for(;i<n; i++){
    //         indents.push(<SelectDiscount key={i} onChange={(e) => console.log(e)}/>)
    //     }
    //     return indents
    // }

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
                            onChange={(e) => {
                                const regex = /^([0-9]){1,3}$/i;
                                if(e.currentTarget.value === '' || regex.test(e.currentTarget.value)){
                                    setNumberOfSeats(e.currentTarget.value)
                                }
                            }
                        }
                        />
                    </div>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                   <DiscountForm/>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChooseMovieType
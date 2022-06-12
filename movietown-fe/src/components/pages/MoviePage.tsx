import { Divider, Grid, styled } from '@material-ui/core'
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById, movie } from '../../api/MovieApi'
import { getDates, getScreeningByMovieId, request_screening } from '../../api/ScreeningApi'
import ScreeningList from '../ScreeningList'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { Description, Title } from '../MovieCard';
import { DatePickerLabel } from '../customer_components/DatePickerLabel';

const MoviePageContainer = styled('div')({
        color: "white",
        padding: "20px",
        backgroundColor: "#282c34"
})

const BigImage = styled('img')({
    height: "500px",
    marginRight: "50%",
    borderRadius: "5px",
    width: "300px",
    objectFit: "contain"
})

const MoviePage: React.FC<{}> = () => {
    const { id } = useParams()
    const [movieData, setMovieData] = useState<null | movie>(null)
    const [screenings, setScreenings] = useState<request_screening[]>([])
    const [error, setError] = useState<null | any>(null)

    useEffect(() => {
        const movieId = Number(id)
        if (!isNaN(movieId)) {
            getMovieById(movieId)
                .then(({ data }) => {
                    setMovieData(data)
                })
                .catch((err) => {
                    setError(err)
                })
        }

    }, [id])

    const [date, setDate] = useState<Date | null>(new Date())
    useEffect(() => {
        const movieId = Number(id)
        if (!isNaN(movieId)) {
            const [d, to] = getDates(date!)
            getScreeningByMovieId(movieId, {
                from: d as Date,
                to: to
            }).then(({ data }) => {
                setScreenings(screenings => [...data])
            })
                .catch((err) => console.error(err))
        }
    }, [date])

    const showError = (err: any) => {

        return <div>
            {
                err.status === 404 ?
                    <div> Nie ma takiego filmu </div> :
                    <div> Coś poszło nie tak </div>
            }

        </div>
    }

    const showMovieInfo = (movieData: movie | null) => {
        if (movieData === null)
            return <div></div>

        return <div>
            <Grid container>
                <Grid item xs={4}>
                    <BigImage src={movieData.url} />
                </Grid>
                <Grid item xs={8}>
                    <Title>
                        {movieData.title}
                    </Title>
                    <Description>
                        {movieData.description}
                    </Description>
                </Grid>
            </Grid>
            <Divider />
            <DatePickerLabel>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </DatePickerLabel>
            <ScreeningList screenings={screenings} />
        </div>
    }

    return <MoviePageContainer>
        {error == null ? showMovieInfo(movieData) : showError(error)}
    </MoviePageContainer>
}

export default MoviePage
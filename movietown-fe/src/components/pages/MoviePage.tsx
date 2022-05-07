import { Grid, makeStyles, Typography } from '@material-ui/core'
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById, movie } from '../../api/MovieApi'
import { getScreeningByMovieId, screening } from '../../api/ScreeningApi'
import ScreeningList from '../ScreeningList'
import DateAdapter from '@mui/lab/AdapterDateFns'

const useStyles = makeStyles(() => ({

}))

const MoviePage: React.FC<{}> = () => {
    const { id } = useParams()
    const [movieData, setMovieData] = useState<null | movie>(null)
    const [screenings, setScreenings] = useState<screening[]>([])
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
            const to = new Date()
            to.setDate(date!.getDate() + 1)
            to.setHours(0)
            to.setMinutes(0)
            to.setSeconds(0)
            to.setMilliseconds(0)
            getScreeningByMovieId(movieId, {
                from: date as Date,
                to: to
            }).then(({ data }) => {
                console.log(data)
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
                    Some image there i dont fucking know
                </Grid>
                <Grid item xs={8}>
                    <Typography>
                        {movieData.title}
                    </Typography>
                    <Typography>
                        {movieData.description}
                    </Typography>
                </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Data seansu"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

            </LocalizationProvider>
            <ScreeningList screenings={screenings} />
        </div>
    }

    return <div>
        {error == null ? showMovieInfo(movieData) : showError(error)}

    </div>
}

export default MoviePage
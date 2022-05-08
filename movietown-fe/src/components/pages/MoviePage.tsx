import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById, movie } from '../../api/MovieApi'
import { getScreeningByMovieId, screening } from '../../api/ScreeningApi'
import ScreeningList from '../ScreeningList'
import DateAdapter from '@mui/lab/AdapterDateFns'

const useStyles = makeStyles(() => ({
    datePickerLabel: {
        backgroundColor: "white",
        borderRadius: "8px",
        margin: "0 40% 0 40%"
    },
    entire: {
        color: "white",
        padding: "20px",
        backgroundColor: "#282c34"
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold"
    },
    description: {
        textAlign: "left",
        fontSize: "20px"
    }
}))

const MoviePage: React.FC<{}> = () => {
    const { datePickerLabel, entire, title, description } = useStyles()
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
            const today = new Date
            const d = today.getDay() === date!.getDay() ? today : date!
            const to = new Date(d)
            to.setDate(d.getDate() + 1)
            to.setHours(0)
            to.setMinutes(0)
            to.setSeconds(0)
            to.setMilliseconds(0)
            if (d.getDay() != today.getDay()) {
                d.setHours(0)
                d.setMinutes(0)
                d.setSeconds(0)
                d.setMilliseconds(0)
            }
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
                    <img src={movieData.url} />
                </Grid>
                <Grid item xs={8}>
                    <Typography className={title}>
                        {movieData.title}
                    </Typography>
                    <Typography className={description}>
                        {movieData.description}
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <div className={datePickerLabel}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <ScreeningList screenings={screenings} />
        </div>
    }

    return <div className={entire}>
        {error == null ? showMovieInfo(movieData) : showError(error)}

    </div>
}

export default MoviePage
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getDaysScreenings, screening } from '../../api/ScreeningApi'
import ScreeningList from '../ScreeningList'
import { getQueriedMovies, movie } from '../../api/MovieApi'

interface carouselData {
    image: string,
    headerText?: string,
    subText?: string
}

const useStyles = makeStyles(() => ({
    card: {
        color: "white",
        borderRadius: "10px",
        width: "90%",
        margin: "20px",
        padding: "20px",
        backgroundColor: "#282c34",
        textAlign: "left"
    },
    header: {
        fontSize: "40px",
        fontWeight: "bold",
        fontFamily: "Halvetica",
    },
    content: {
        marginTop: "20px",
        fontSize: "20px"
    }
}))

const HomePage: React.FC<{}> = () => {
    const { card, header, content } = useStyles()
    const [screenings, setScreenings] = useState<screening[]>([])
    const [data, setData] = useState<carouselData[]>([])
    useEffect(() => {
        setData([])
        const today = new Date()
        const to = new Date()
        to.setDate(today.getDate() + 1)
        to.setHours(0)
        to.setMinutes(0)
        to.setSeconds(0)
        to.setMilliseconds(0)
        getDaysScreenings({
            from: today,
            to: to
        }).then(({ data }) => {
            setScreenings([...data])
        }).catch((err) => console.error(err))

        getQueriedMovies("", 5, 0).then(({data}) => {
            const movies = data as movie[]
            movies.map((movie, index) => {
                setData(carouselData => [...carouselData, {
                    image: movie.url,
                    headerText: movie.title,
                    subText: movie.description
                }])
            })
        }).catch((err) => console.error(err))

    }, [])
    return <Grid container className={card}>
        <Grid item xs={7}>
            <Typography className={header}>
                Witaj w MovieTown
            </Typography>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={5}>
            <Typography>
                Co dzisiaj leci:
            </Typography>
            <ScreeningList screenings={screenings} />
        </Grid>
    </Grid>
}

export default HomePage
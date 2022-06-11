import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getDaysScreenings, screening } from '../../api/ScreeningApi'
import ScreeningList from '../ScreeningList'
import { getQueriedMovies, movie } from '../../api/MovieApi'
import Carousel from '../Carousel'
import { styled } from '@mui/material'

interface carouselData {
    image: string,
    headerText?: string,
    subText?: string
}


const Home = styled('div')({
    display: "flex",
    justifyContent: "center"
})

const Card = styled(Grid)({
    color: "white",
    borderRadius: "10px",
    width: "90%",
    padding: "20px",
    backgroundColor: "#282c34",
    textAlign: "left"
})

const CardHeader = styled(Typography)({
    fontSize: "40px",
    fontWeight: "bold",
    fontFamily: "Halvetica",
})

const HomePage: React.FC<{}> = () => {
    const [screenings, setScreenings] = useState<screening[]>([])
    const [data, setData] = useState<movie[]>([])
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

        getQueriedMovies("", 3, 0).then(({ data }) => {
            setData(data)
        }).catch((err) => console.error(err))

    }, [])
    return <Home>
        <Card container>
            <Grid item xs={12}>
                <CardHeader>
                    Witaj w MovieTown
                </CardHeader>
            </Grid>
            <Grid item xs={6}>
                <Carousel data={data} />
            </Grid>
        </Card>
    </Home>
}

export default HomePage
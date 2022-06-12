import {Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getLatestMovies, movie } from '../../api/MovieApi'
import Carousel from '../Carousel'
import { styled } from '@mui/material'

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
    const [data, setData] = useState<movie[]>([])
    useEffect(() => {
        setData([])
        getLatestMovies(3, 0)
        .then(({ data }) => {
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
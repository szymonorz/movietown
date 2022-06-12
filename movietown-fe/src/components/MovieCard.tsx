import React from 'react'
import { Typography, Divider, Grid } from '@material-ui/core'
import { movie } from '../api/MovieApi'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material'
import { Image } from './StyledImage'


interface MovieCardProps {
    movie: movie
}

const Card = styled('div')({
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    margin: "0 25% 0 25%"
})

export const Title = styled(Typography)({
    fontSize: "20px",
    color: "white",
    textDecoration: 'none',
    textAlign: "left"
})

export const Description = styled(Typography)({
    fontSize: "15px",
    textAlign: "left",
    padding: "5px"
})

const Types = styled(Typography)({
    textAlign: "left",
    color: "grey"
})

const MDivider = styled(Divider)({
    backgroundColor: "grey"
})

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const movieTypeString = () => {
        return movie.movie_types.map(mtype => { return mtype.type }).toString()
    }
    return (
        <Card>
            <Grid container>
                <Grid item xs={3}>
                    <Image src={movie.url}/>
                </Grid>
                <Grid item xs={9}>
                    <Title {...{
                        component: Link,
                        to: `/movie/${movie.id}`

                    }}>
                        {movie.title}
                    </Title>
                    <Description>
                        {movie.description}
                    </Description>
                    <Types>
                        {movieTypeString()}
                    </Types>
                    <MDivider/>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MovieCard
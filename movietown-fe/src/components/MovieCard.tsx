import React from 'react'
import { Typography, makeStyles, Divider } from '@material-ui/core'

export interface movie_type {
    price: number,
    type: string
}

export interface movie {
    id: number,
    title: string,
    director: string,
    description: string,
    length: number,
    type: movie_type
}

interface MovieCardProps {
    movie: movie
}

const useStyles = makeStyles(() => ({
    card: {
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        margin: "0 25% 0 25%"
    },
    title: {
        fontSize: "20px",
        textAlign: "left"
    },
    description: {
        fontSize: "15px",
        textAlign: "left",
        padding: "5px"
    }
}))

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { card, title, description } = useStyles()

    return (
        <div className={card}>
            <Typography className={title}>
                {movie.title}
            </Typography>
            <Typography className={description}>
                {movie.description}
            </Typography>
            <Divider />
        </div>
    )
}

export default MovieCard
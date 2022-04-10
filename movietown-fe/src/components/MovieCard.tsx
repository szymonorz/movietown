import React from 'react'
import { Typography, makeStyles, Divider } from '@material-ui/core'
import {movie} from '../api/MovieApi'


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
    },
    types: {
        textAlign: "left",
        color: "grey"
    }
}))

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { card, title, description, types } = useStyles()
    const movieTypeString = () => {
        return movie.movie_types.map(mtype => {return mtype.type}).toString()
    }
    return (
        <div className={card}>
            <Typography className={title}>
                {movie.title}
            </Typography>
            <Typography className={description}>
                {movie.description}
            </Typography>
            <Typography className={types}>
                {movieTypeString()}
            </Typography>
            <Divider />
        </div>
    )
}

export default MovieCard
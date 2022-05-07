import React from 'react'
import { Typography, makeStyles, Divider } from '@material-ui/core'
import {movie} from '../api/MovieApi'
import {Link} from 'react-router-dom'
import { black } from 'material-ui/styles/colors'


interface MovieCardProps {
    movie: movie
}

const useStyles = makeStyles(() => ({
    card: {
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        color: "white",
        margin: "0 25% 0 25%"
    },
    title: {
        fontSize: "20px",
        color: "white",
        textDecoration: 'none',
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
    },
    divider: {
        backgroundColor: "grey"
    }
}))

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { card, title, description, types, divider } = useStyles()
    const movieTypeString = () => {
        return movie.movie_types.map(mtype => {return mtype.type}).toString()
    }
    return (
        <div className={card}>
            <Typography {...{
                className: title,
                component: Link,
                to: `/movie/${movie.id}`

            }}>
                {movie.title}
            </Typography>
            <Typography className={description}>
                {movie.description}
            </Typography>
            <Typography className={types}>
                {movieTypeString()}
            </Typography>
            <Divider className={divider}/>
        </div>
    )
}

export default MovieCard
import React from 'react'
import { Typography, makeStyles, Divider, Grid } from '@material-ui/core'
import { movie } from '../api/MovieApi'
import { Link } from 'react-router-dom'


interface MovieCardProps {
    movie: movie
}

const useStyles = makeStyles(() => ({
    card: {
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
    },
    image: {
        width: "80px",
        height: "100px",
        marginRight: "50%"
    }
}))

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { card, title, description, types, divider, image } = useStyles()
    const movieTypeString = () => {
        return movie.movie_types.map(mtype => { return mtype.type }).toString()
    }
    console.log(movie)
    return (
        <div className={card}>
            <Grid container>
                <Grid item xs={3}>
                    <img src={movie.url} className={image} />
                </Grid>
                <Grid item xs={9}>
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
                    <Divider className={divider} />
                </Grid>
            </Grid>
        </div>
    )
}

export default MovieCard
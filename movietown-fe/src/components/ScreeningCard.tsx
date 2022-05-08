import React from 'react'
import { makeStyles, Typography, Divider, Grid } from '@material-ui/core'
import { screening } from '../api/ScreeningApi'
import { movie, movie_type } from '../api/MovieApi'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    element: {
        margin: "0 15% 0 15%",
    },
    href: {
        textDecoration: "none",
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    },
    timeLabel: {
        backgroundColor: "darkMagenta",

        fontWeight: "bold",
        fontFamily: "Halvetica",
        color: "white",
        width: "fit-content",
        padding: "10px",
        borderRadius: "4px",
    },
    block: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        color: "white",
        fontWeight: "bold"
    },
    image: {
        width: "80px",
        height: "100px",
        marginRight: "50%"
    }
}))

interface ScreeningCardProps {
    values: screening
}

const ScreeningCard: React.FC<ScreeningCardProps> = ({ values: { id, mm_type: { movie, movie_type: { type } }, movie_hall, start_of_screening } }) => {
    const { href, timeLabel, block, element, image } = useStyles()
    const time = new Date(start_of_screening)

    return (
        <div className={element}>
            <Grid container>
                <Grid item xs={3}>
                    <Link to={`/movie/${movie.id}`}>
                        <img src={movie.url} className={image} />
                    </Link>
                </Grid>
                <Grid item xs={9}>
                    <Typography {...{
                        className: href,
                        color: "inherit",
                        to: `/movie/${movie.id}`,
                        component: Link
                    }}>{movie.title}</Typography>
                    <div className={block}>
                        <Link to={`/reservation?id=${id}`}>
                            <div className={timeLabel}>
                                {time.getHours()}:{time.getMinutes()}
                            </div>
                        </Link>
                        <Typography>Rodzaj: {type}</Typography>
                        <Typography>Sala: {movie_hall.name}</Typography>
                    </div>

                </Grid>
            </Grid>
            <Divider />

        </div>
    )
}

export default ScreeningCard
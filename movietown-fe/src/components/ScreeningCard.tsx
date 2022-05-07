import React from 'react'
import { makeStyles, Typography, Divider } from '@material-ui/core'
import { screening } from '../api/ScreeningApi'
import { movie, movie_type } from '../api/MovieApi'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(() => ({
    element: {
        margin: "0 15% 0 15%",
    },
    href: {
        textDecoration: "none",
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
    }
}))

interface ScreeningCardProps {
    values: screening
}

const ScreeningCard: React.FC<ScreeningCardProps> = ({ values: { id, mm_type: { movie, movie_type: { type } }, movie_hall, start_of_screening } }) => {
    const {href, timeLabel, block, element } = useStyles()
    const time = new Date(start_of_screening)

    return (
        <div className={element}>
            <Typography {...{
                className: href,
                color: "inherit",
                to: `/reservation?id=${id}`,
                component: Link
            }}>{movie.title}</Typography>
            <div className={block}>
                <div className={timeLabel}>{time.getHours()}:{time.getMinutes()}</div>
                <Typography>Rodzaj: {type}</Typography>
                <Typography>Sala: {movie_hall.name}</Typography>
            </div>
            <Divider />
        </div>
    )
}

export default ScreeningCard
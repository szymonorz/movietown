import React from 'react'
import { makeStyles, Typography, Divider } from '@material-ui/core'
import { screening } from '../api/ScreeningApi'
import { movie, movie_type } from '../api/MovieApi'

const useStyles = makeStyles(() => ({
    timeLabel: {
        backgroundColor: "darkMagenta",

        fontWeight: "bold",
        fontFamily: "Halvetica",
        color: "white",
        width: "fit-content",
        padding: "10px",
        borderRadius: "4px"
    },
    block: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
}))

interface ScreeningCardProps {
    values: screening
}

const ScreeningCard: React.FC<ScreeningCardProps> = ({ values: { mm_type: { movie, movie_type: { type } }, movie_hall, start_of_screening } }) => {
    const { timeLabel, block } = useStyles()
    const time = new Date(start_of_screening)

    return (
        <div>
            <Typography>{movie.title}</Typography>
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
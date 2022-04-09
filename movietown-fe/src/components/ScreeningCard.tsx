import React from 'react'
import {makeStyles, Typography, Divider} from '@material-ui/core'
import { screening } from '../api/ScreeningApi'

const useStyles = makeStyles(() => ({
    timeLabel: {
        backgroundColor: "darkMagenta",

        fontWeight: "bold",
        fontFamily: "Halvetica",
        color: "white",
        width: "fit-content",
        padding: "10px",
        borderRadius: "4px"
    }
}))

interface ScreeningCardProps{
    values: screening
}

const ScreeningCard: React.FC<ScreeningCardProps> = ({values: {movie, movie_hall, start_of_screening}}) => {
    const {timeLabel} = useStyles()
    const time = new Date(start_of_screening)
    
    return (
        <div>
            <Typography>{movie.title}</Typography>
            <Typography>{movie_hall.name}</Typography>
            <div className={timeLabel}>{time.getHours()}:{time.getMinutes()}</div>
            <Divider/>
        </div>
    )
}

export default ScreeningCard
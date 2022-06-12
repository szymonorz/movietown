import React, { useEffect, useState } from 'react'
import { makeStyles, Typography, Divider, Grid } from '@material-ui/core'
import { request_screening } from '../api/ScreeningApi'
import { getMovieImageUrl} from '../api/MovieApi'
import { Link } from 'react-router-dom'
import { Image } from './StyledImage'

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
    }
}))

interface ScreeningCardProps {
    value: request_screening
}

const ScreeningCard: React.FC<ScreeningCardProps> = ({ value }) => {
    const { href, timeLabel, block, element } = useStyles()
    const time = new Date(value.start_of_screening)
    const [imageURL, setImageURL] = useState<string>("")

    useEffect(() => {
        getMovieImageUrl(value.movie_id)
        .then(({data}) => setImageURL(data))
    }, [])
    return (
        <div className={element}>
            <Grid container>
                <Grid item xs={3}>
                    <Link to={`/movie/${value.movie_id}`}>
                        <Image src={imageURL}/>
                    </Link>
                </Grid>
                <Grid item xs={9}>
                    <Typography {...{
                        className: href,
                        color: "inherit",
                        to: `/movie/${value.movie_id}`,
                        component: Link
                    }}>{value.movie_title}</Typography>
                    <div className={block}>
                        <Link to={`/reservation?id=${value.id}`}>
                            <div className={timeLabel}>
                                {time.getHours()}:{time.getMinutes()}
                            </div>
                        </Link>
                        <Typography>Rodzaj: {value.movie_type}</Typography>
                        <Typography>Sala: {value.movie_hall_name}</Typography>
                    </div>

                </Grid>
            </Grid>
            <Divider />

        </div>
    )
}

export default ScreeningCard
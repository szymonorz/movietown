import { styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { movie } from '../api/MovieApi'

const StyledCarouselImage = styled('img')({
    width: "900px",
    height: "500px",
    borderRadius: "10px",
    "@media (max-width: 1000px)": {
        width: "600px"
    },
    "@media (max-width: 650px)": {
        width: "300px"
    },
    "@media (max-height: 500px)": {
        height: "300px"
    }
})


const OverlayShadow = styled('div')({
    width: "900px",
    height: "500px",
    borderRadius: "10px",
    "@media (max-width: 1000px)": {
        width: "600px"
    },
    "@media (max-width: 650px)": {
        width: "300px"
    },
    "@media (max-height: 500px)": {
        height: "300px"
    },
    position: "absolute",
    backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(12,12,12,1))",
})

const OverlayText = styled('div')({
    position: "absolute",
    textAlign: "center",
    bottom: "100px",
    left: "20px",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px"
})


interface CarouselImageProps {
    data: movie
}

const CarouselImage: React.FC<CarouselImageProps> = ({ data }) => {
    return <Link to={`/movie/${data.id}`}>
        <OverlayShadow>
            <OverlayText>
                {data.title}
            </OverlayText>
        </OverlayShadow>
        <StyledCarouselImage src={data.url} />
    </Link>
}

export default CarouselImage
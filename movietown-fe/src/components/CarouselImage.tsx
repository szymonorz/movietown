import { styled } from '@mui/material'
import React from 'react'
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
interface CarouselImageProps{
    data: movie
}

const CarouselImage: React.FC<CarouselImageProps> = ({data}) => {
    return <StyledCarouselImage src={data.url}/>
}

export default CarouselImage
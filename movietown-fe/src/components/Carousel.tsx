import { styled } from '@mui/material'
import React, { useState } from 'react'
import { movie } from '../api/MovieApi';
import CarouselButton from './CarouselButton';
import CarouselImage from './CarouselImage';
import { ActiveDot, Dot, DotContainer } from './Dot';


const StyledCarousel = styled('div')({
    position: "relative",
    marginLeft: "90%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});

interface CarouselProps {
    data: movie[]
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
    const [current, setCurrent] = useState<number>(0)

    const nextImage = () => {
        setCurrent(current => current + 1 === data.length ? 0 : current + 1)
    }

    const prevImage = () => {
        setCurrent(current => current - 1 < 0 ? data.length - 1 : current - 1)
    }

    return <StyledCarousel>
        {data.map((movie, index) => {
            return <div key={index}>
                {index === current && (
                    <CarouselImage data={movie} />
                )}
            </div>
        })}

        <CarouselButton action={prevImage} direction={"previous"} />
        <CarouselButton action={nextImage} direction={"next"} />
        <DotContainer>
            {Array.from({ length: data.length }).map((_, index) => {
                if(index === current) return <ActiveDot key={index}/>
                return <Dot key={index}/>
               }
            )}
        </DotContainer>
    </StyledCarousel>
}

export default Carousel
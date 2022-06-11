import React from 'react'
import { styled, IconButton } from '@mui/material'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { makeStyles } from '@material-ui/core'
const StyledCarouselButton = styled(IconButton)({
    // width: "300px",
    // height: "0px",
    position: "absolute",
    fontSize: "2rem",
    color: "#000",
    zIndex: "10",
    cursor: "pointer",
    userSelect: "none"
})

const LeftArrow = styled(StyledCarouselButton)({
    right: "400px",
    "@media (max-width: 1000px)": {
        right: "200px"
    },
    "@media (max-width: 650px)": {
        right: "100px"
    },
})

const RightArrow = styled(StyledCarouselButton)({
    left: "400px",
    "@media (max-width: 1000px)": {
        left: "200px"
    },
    "@media (max-width: 650px)": {
        left: "100px"
    },
})

interface CarouselButtonProps {
    action: () => void,
    direction: string
}

const CarouselButton: React.FC<CarouselButtonProps> = ({ action, direction }) => {
    if (direction === "next") {
        return <RightArrow onClick={action}>
            {direction === "next" && (<FaArrowRight />)}
        </RightArrow>
    } else if (direction === "previous") {
        return <LeftArrow onClick={action}>
            {direction === "previous" && (<FaArrowLeft />)}
        </LeftArrow>
    }
    return direction === "next" ? <RightArrow onClick={action}>
        {direction === "next" && (<FaArrowRight />)}
    </RightArrow> : <LeftArrow onClick={action}>
            {direction === "previous" && (<FaArrowLeft />)}
        </LeftArrow>
}

export default CarouselButton
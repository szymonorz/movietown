import React from 'react'
import {styled, IconButton} from '@mui/material'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
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

const useStyles = makeStyles(() => ({
    left: {
        right: "400px",
    },
    right: {
        left: "400px"
    }
}))

interface CarouselButtonProps{
    action: () => void,
    direction: string
}

const CarouselButton: React.FC<CarouselButtonProps> = ({action, direction}) => {
    const {left, right} = useStyles()
    return <StyledCarouselButton onClick={action} className={direction === "next" ? right : left}>
        {direction === "next" && (<FaArrowRight/>)}
        {direction === "previous" && (<FaArrowLeft/>)}
    </StyledCarouselButton>
}

export default CarouselButton
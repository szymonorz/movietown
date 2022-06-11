import { styled } from "@mui/material";

export const DotContainer = styled('div')({
    position: "absolute",
    bottom: "200px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    "@media (max-height: 720px)": {
        bottom: "100px"
    },
    "@media (max-height: 500px)": {
        bottom: "80px"
    }
})

export const Dot = styled('div')({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "3px solid #d1d1d1",
    margin: "0 5px",
    background: "#d1d1d1"
})

export const ActiveDot = styled(Dot)({
    background: "rgb(32,32,32)"
})
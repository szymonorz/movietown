import { styled } from "@mui/material";

export const DotContainer = styled('div')({
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex"
})

export const Dot = styled('div')({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "3px solid #f1f1f1",
    margin: "0 5px",
    background: "#f1f1f1"
})

export const ActiveDot = styled(Dot)({
    background: "rgb(32,32,32)"
})
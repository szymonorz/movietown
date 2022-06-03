import { Button, BaseTextFieldProps } from '@material-ui/core'
import { styled } from '@mui/system'
import React from 'react'

interface ButtonProps extends BaseTextFieldProps {
    label: string,
    onClick: (arg: any) => void
}

const StyledMButton = styled(Button)({
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#A51272",
    margin: "20px 10px 0 10px",
    '&:hover': {
        backgroundColor: "#A51272",
    }
})

const MButton: React.FC<ButtonProps> = ({label, onClick, disabled}) => {
    return <StyledMButton
            disabled={disabled}
            onClick={onClick}
            >
        {label}
    </StyledMButton>
}

export default MButton
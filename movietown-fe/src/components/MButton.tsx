import { makeStyles, Button, BaseTextFieldProps } from '@material-ui/core'
import { OverridableTypeMap } from '@material-ui/core/OverridableComponent'
import React from 'react'

interface ButtonProps extends BaseTextFieldProps {
    label: string,
    onClick: (arg: any) => void
}

const useStyles = makeStyles(() => ({
    button: {
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#A51272",
        margin: "20px 10px 0 10px",
        '&:hover': {
            backgroundColor: "#A51272",
        }
    }
}))

const MButton: React.FC<ButtonProps> = ({label, onClick, disabled}) => {
    const {button} = useStyles()
    return <Button
            disabled={disabled}
            onClick={onClick}
            className={button}
            >
        {label}
    </Button>
}

export default MButton
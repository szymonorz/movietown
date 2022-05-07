import React from 'react';
import { TextField, makeStyles, Typography, BaseTextFieldProps } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';

const useStyles = makeStyles(() => ({
    root: {
        background: "white"
    },
    textLabel: {
        float: "left",
        fontWeight: 200,
        padding: "10px"
    }
}))


interface TextFieldProps {
    label: string,
    name: string
}


const MTextField: React.FC<TextFieldProps & FieldAttributes<{}> & BaseTextFieldProps> = ({ name, label, placeholder, type, disabled }) => {
    const { root, textLabel} = useStyles()
    const [field, meta] = useField<string>(name)
    const hasError = meta.error && meta.touched
    const errorText = hasError ? meta.error : ''

    return (
        <div>
            <Typography className={textLabel}>
                {label}
            </Typography>

            <TextField
                disabled={disabled}
                InputProps={{ className: root }}
                error={hasError as boolean}
                variant='outlined'
                fullWidth={true}
                helperText={errorText}
                placeholder={placeholder}
                type={type}
                {...field}
            />

        </div>
    )

}


export default MTextField
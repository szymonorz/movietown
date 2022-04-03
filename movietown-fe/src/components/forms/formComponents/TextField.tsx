import React from 'react';
import { TextField, makeStyles, Typography } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';


const useStyles = makeStyles(() => ({
    root: {
        background: "white"
    },
    textLabel: {
        float: "left",
        fontWeight: 200
    }
}))


interface TextFieldProps {
    label: string,
    name: string,
}


const MTextField: React.FC<TextFieldProps & FieldAttributes<{}>> = ({ name, label, placeholder, type }) => {
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
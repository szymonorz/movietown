import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import MTextField from './formComponents/TextField';
import * as Yup from 'yup';


export interface SignInValues {
    username: string,
    password: string
}

const signInFormValidation = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
})

interface SignInFormProps {
    loginError: boolean,
    className: string,
    onSubmit: (values: SignInValues) => void;
}


const useStyles = makeStyles(() => ({
    submitButton: {
        marginTop: "20px",
        fontWeight: 'bold',
        backgroundColor: "#A51272",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#A51272"
        }
    }
}))

const SignIn: React.FC<SignInFormProps> = ({ loginError, className, onSubmit }) => {
    const { submitButton } = useStyles()

    return (
        <div className={className}>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={signInFormValidation}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    Sign In
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <MTextField
                                    // value={values.username}
                                    name='username'
                                    label='Login'
                                    type='text'
                                    placeholder='lain' />
                            </Grid>

                            <Grid item xs={6}>
                                <MTextField
                                    // value={values.password}
                                    name='password'
                                    label='Password'
                                    type='password'
                                    placeholder='deez nutz' />
                            </Grid>

                        </Grid>
                        <Button
                            className={submitButton}
                            type={'submit'}
                        >
                            Login
                        </Button>
                    </Form>
                )}

            </Formik>

            {loginError && (
                <div>Something broke</div>
            )}
        </div>
    )
}


export default SignIn;
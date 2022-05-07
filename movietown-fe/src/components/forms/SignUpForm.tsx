import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import MTextField from './formComponents/TextField';


export interface SignUpValues {
    name: string,
    surname: string,
    email: string,
    username: string,
    password: string,
    phone_number: string
}

interface SignUpProps {
    registerError: boolean,
    className: string,
    onSubmit: (values: SignUpValues) => void
}

const signUpFormValidator = Yup.object().shape({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),

})

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#A51272",
        color: "white",
        fontWeight: 'bold',
        '&:hover':{
            backgroundColor: "#A51272",
        }
    }
}))

const SignUpForm: React.FC<SignUpProps> = ({registerError, className, onSubmit }) => {
    const {button} = useStyles()
    return (
        <div className={className}>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    username: '',
                    password: '',
                    phone_number: ''
                }}
                validationSchema={signUpFormValidator}
                onSubmit={(values) => onSubmit(values)}
            >
                {() => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    Sign Up for MovieTown
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <MTextField
                                    name='name'
                                    label='First Name'
                                    placeholder='Grzegorz'

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MTextField
                                    name='surname'
                                    label='Last Name'
                                    placeholder='Brzęczyszczykiewicz'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MTextField
                                    name='username'
                                    label='Username'
                                    placeholder='lain'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MTextField
                                    name='password'
                                    label='password'
                                    type='password'
                                    placeholder='deez nutz'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MTextField
                                    name='email'
                                    label='Email'
                                    placeholder='joe+mama@mail.com'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MTextField
                                    name='phone_number'
                                    label='Phone number'
                                    placeholder='123456789'
                                />
                            </Grid>
                            <Button className={button} type={"submit"}>Register</Button>
                        </Grid>
                    </Form>
                )}
            </Formik>

            {registerError && (
                <div>Something broke</div>
            )}

        </div>

    )

}

export default SignUpForm;
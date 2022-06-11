import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import MTextField from './formComponents/TextField';
import MButton from '../MButton';


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
    onSubmit: (values: SignUpValues) => void
}

const signUpFormValidator = Yup.object().shape({
    name: Yup.string().required("Pole wymagane"),
    surname: Yup.string().required("Pole wymagane"),
    email: Yup.string().email("Invalid email").required("Pole wymagane"),
    username: Yup.string().required("Pole wymagane"),
    password: Yup.string().required("Pole wymagane"),
    phone_number: Yup.string().matches(/^\d+$/, "Tylko cyfry są dzwolone").required("Pole wymagane"),
})

const SignUpForm: React.FC<SignUpProps> = ({registerError, onSubmit }) => {
    return (
        <div>
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
                {({handleSubmit}) => (
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
                                    label='Imię'
                                    placeholder='Grzegorz'

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MTextField
                                    name='surname'
                                    label='Nazwisko'
                                    placeholder='Brzęczyszczykiewicz'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MTextField
                                    name='username'
                                    label='Nazwa użytkownika'
                                    placeholder='lain'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MTextField
                                    name='password'
                                    label='password'
                                    type='Hasło'
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
                                    label='Numer telefonu'
                                    placeholder='123456789'
                                />
                            </Grid>
                            <MButton 
                                label='Zarejestruj'
                                onClick={handleSubmit}
                            />
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
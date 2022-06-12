import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Typography } from '@material-ui/core';
import MTextField from './formComponents/TextField';
import * as Yup from 'yup';
import MButton from '../MButton';


export interface SignInValues {
    username: string,
    password: string
}

const signInFormValidation = Yup.object().shape({
    username: Yup.string().required("Pole wymagane"),
    password: Yup.string().required("Pole wymagane"),
})

interface SignInFormProps {
    loginError: boolean,
    onSubmit: (values: SignInValues) => void;
}

const SignIn: React.FC<SignInFormProps> = ({ loginError, onSubmit }) => {

    return (
        <div>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={signInFormValidation}
            >
                {({ handleSubmit }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    Sign In
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <MTextField
                                    name='username'
                                    label='Login'
                                    type='text'
                                    placeholder='lain' />
                            </Grid>

                            <Grid item xs={6}>
                                <MTextField
                                    name='password'
                                    label='Hasło'
                                    type='password'
                                    placeholder='********' />
                            </Grid>

                        </Grid>
                        <MButton
                            label='Zaloguj'
                            onClick={handleSubmit}
                        />
                    </Form>
                )}

            </Formik>

            {loginError && (
                <div>Coś poszło nie tak</div>
            )}
        </div>
    )
}


export default SignIn;
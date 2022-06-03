import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import MTextField from './formComponents/TextField';
import * as Yup from 'yup';
import MButton from '../MButton';


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
                                    placeholder='deez nutz' />
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
                <div>Something broke</div>
            )}
        </div>
    )
}


export default SignIn;
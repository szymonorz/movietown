import { Typography, Grid, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCustomerInfo, LoginStateContext } from '../../api/CustomerApi';
import MTextField from '../forms/formComponents/TextField';
import { makeStyles } from '@material-ui/styles';
import * as Yup from 'yup';
import { updateCustomerInfo } from '../../api/CustomerApi';
import MButton from '../MButton';


export interface AccountValues {
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    phone_number: string,
    is_student: boolean
}

const useStyles = makeStyles(() => ({
    form: {
        color: "white",
        padding: "30px",
        backgroundColor: "#282c34",
        borderRadius: "20px"
    },
    button: {
        color: "white",
        '&:disabled': {
            color: "grey"
        }
    }
}))

const accountFormValidator = Yup.object().shape({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),

})

const CustomerAccount: React.FC<{}> = () => {
    // const [loginStatus, setLoginStatus] = useState<boolean>(true)
    const provider = useContext(LoginStateContext)
    const { loginState, setLoginState } = provider!
    const [accountValues, setAccountValues] = useState<AccountValues>({
        id: 0,
        name: '',
        surname: '',
        username: '',
        email: '',
        phone_number: '',
        is_student: false
    })
    const [disabled, setDisabled] = useState<boolean>(true)
    const [authorized, setAuthorized] = useState<boolean>(false)
    const token = localStorage.getItem("token")
    const { form, button } = useStyles()
    useEffect(() => {
        if (token) {
            const infoPromise = getCustomerInfo(token)
            infoPromise.then(({ status, data }) => {
                if (status === 200) {
                    setAccountValues(data)
                } else {
                    console.error("Something broke")
                }
            }).catch((err) => {
                console.error(err.response.status)
                if(err.response.status === 401){
                    setAuthorized(false)
                    setLoginState(false)
                    localStorage.removeItem("token")
                }
            })
        }else{
            setLoginState(false)
        }
    }, [])

    return (
        <div style={{width: "50%"}}>
            {(!loginState) && <Navigate replace to={"/"} />}
            <Formik
                enableReinitialize
                initialValues={accountValues}
                validationSchema={accountFormValidator}
                onSubmit={(values) => {
                    updateCustomerInfo(token as string, values)
                    .then((response) => console.log(response))
                    .catch((err) => console.error(err))
                    setDisabled(true)
                }}
            >
                {({handleSubmit}) => (
                    <Form className={form}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography>
                                    {accountValues.username}'s account information
                                </Typography>
                            </Grid>

                            <Grid item xs={5}>
                                <MTextField
                                    disabled={disabled}
                                    name='name'
                                    label={'Imie'}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <MTextField
                                    disabled={disabled}
                                    name='surname'
                                    label={'Nazwisko'}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <MTextField
                                    disabled={disabled}
                                    name='username'
                                    label={'Nazwa użytkownika'}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <MTextField
                                    disabled={disabled}
                                    name='email'
                                    label={'Email'}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <MTextField
                                    disabled={disabled}
                                    name='phone_number'
                                    label={'Numer telefonu'}
                                />
                            </Grid>
                        </Grid>

                        <MButton
                            disabled={disabled}
                            label='Zapisz'
                            onClick={handleSubmit}/>
                            

                        <MButton 
                        label='Edytuj'
                        onClick={() =>
                            setDisabled(!disabled)
                        }/>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default CustomerAccount
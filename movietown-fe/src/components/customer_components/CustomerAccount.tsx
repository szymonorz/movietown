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
import { StyledForm } from './StyledForm';
import { CustomerContainer } from './StyledCustomerContainer';


export interface AccountValues {
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    phone_number: string,
    is_student: boolean
}

const accountFormValidator = Yup.object().shape({
    name: Yup.string().required("Pole wymagane"),
    surname: Yup.string().required("Pole wymagane"),
    email: Yup.string().email("Niepoprawny email").required("Pole wymagane"),
    username: Yup.string().required("Pole wymagane"),
    phone_number: Yup.string().matches(/^\d+$/, "Tylko cyfry są dzwolone").required("Pole wymagane")
    })


const CustomerAccount: React.FC<{}> = () => {
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
    const [error, setError] = useState<any>()
    const token = localStorage.getItem("token")
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
                setError(err)
                console.error(err.response.status)
                if(err.response.status === 401){
                    setLoginState(false)
                    localStorage.removeItem("token")
                }
            })
        }else{
            setLoginState(false)
        }
    }, [])

    return (
        <CustomerContainer>
            {(!loginState) && <Navigate replace to={"/"} />}
            <Formik
                enableReinitialize
                initialValues={accountValues}
                validationSchema={accountFormValidator}
                onSubmit={(values) => {
                    updateCustomerInfo(token as string, values)
                    .then(() => setDisabled(true))
                    .catch((err) => console.error(err))
                    
                }}
            >
                {({handleSubmit}) => (
                    <StyledForm>
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
                    </StyledForm>
                )}
            </Formik>
            {error && (
                <div>
                    {error["email"]}
                </div>
            )}
        </CustomerContainer>
    )
}

export default CustomerAccount
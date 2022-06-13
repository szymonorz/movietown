import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import MTextField from '../forms/formComponents/TextField';
import { changeCustomersPassword, getCustomerInfo, LoginStateContext } from '../../api/CustomerApi';
import MButton from '../MButton';
import { StyledForm } from './StyledForm';
import { CustomerContainer } from './StyledCustomerContainer';
import { Navigate } from 'react-router-dom';

export interface ChangePasswordValues {
    old_password: string,
    new_password: string,
}


const PasswordValidation = Yup.object().shape({
    old_password: Yup.string().required("Pole wymagane"),
    new_password: Yup.string()
        .required("Pole wymagane")
        .not([Yup.ref('old_password')], "Nowe hasło nie może być takie samo jak stare hasło")
})

const CustomerChangePassword: React.FC<{}> = () => {
    const token = localStorage.getItem("token") || ""
    const provider = useContext(LoginStateContext)
    const { loginState, setLoginState } = provider!
    useEffect(() => {
        if (token) {
            const infoPromise = getCustomerInfo(token)
            infoPromise.then(({ status, data }) => {

            }).catch((err) => {
                setLoginState(false)
                localStorage.removeItem("token")

            })
        } else {
            setLoginState(false)
        }
    }, [])
    return (
        <CustomerContainer>
            {(!loginState) && <Navigate replace to={"/signin?logged=false"} />}
            <Formik
                initialValues={{
                    old_password: '',
                    new_password: ''
                }}

                validationSchema={PasswordValidation}
                onSubmit={(values) => {
                    changeCustomersPassword(token, values)
                        .then((data) => console.log(data))
                        .catch((err) => console.error(err))
                }}
            >

                {({ values, handleSubmit }) => (
                    <StyledForm>
                        <MTextField
                            value={values.old_password}
                            name={'old_password'}
                            label={'Aktualne hasło'}
                            type={'password'}>

                        </MTextField>
                        <MTextField
                            value={values.new_password}
                            name={'new_password'}
                            label={'Nowe hasło'}
                            type={'password'}>

                        </MTextField>
                        <MButton label='Zmień hasło' onClick={handleSubmit} />
                    </StyledForm>
                )}



            </Formik>
        </CustomerContainer>
    )
}

export default CustomerChangePassword
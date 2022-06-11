import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MTextField from '../forms/formComponents/TextField';
import { changeCustomersPassword } from '../../api/CustomerApi';
import MButton from '../MButton';
import { StyledForm } from './StyledForm';
import { CustomerContainer } from './StyledCustomerContainer';

export interface ChangePasswordValues {
    old_password: string,
    new_password: string,
}


const PasswordValidation = Yup.object().shape({
    old_password: Yup.string().required("Required"),
    new_password: Yup.string()
        .required("Required")
        .not([Yup.ref('old_password')], "Nowe hasło nie może być takie samo jak stare hasło")
})

const CustomerChangePassword: React.FC<{}> = () => {
    const token = localStorage.getItem("token") || ""
    return (
        <CustomerContainer>
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
                        <MButton label='Zmień hasło' onClick={handleSubmit}/>
                    </StyledForm>
                )}



            </Formik>
        </CustomerContainer>
    )
}

export default CustomerChangePassword
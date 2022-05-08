import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MTextField from '../forms/formComponents/TextField';
import { Button, makeStyles } from '@material-ui/core'
import { changeCustomersPassword } from '../../api/CustomerApi';
import MButton from '../MButton';

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

const useStyles = makeStyles(() => ({
    form: {
        color: "white",
        padding: "30px",
        backgroundColor: "#282c34",
        borderRadius: "20px"
    }
}))

const CustomerChangePassword: React.FC<{}> = () => {
    const { form} = useStyles()
    const token = localStorage.getItem("token") || ""
    return (
        <div>
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
                    <Form className={form}>
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
                    </Form>
                )}



            </Formik>
        </div>
    )
}

export default CustomerChangePassword
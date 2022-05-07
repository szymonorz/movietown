import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MTextField from '../forms/formComponents/TextField';
import { Button, makeStyles } from '@material-ui/core'
import { white } from 'material-ui/styles/colors';
import { changeCustomersPassword } from '../../api/CustomerApi';

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
        padding: "10px"
    }
}))

const CustomerChangePassword: React.FC<{}> = () => {
    const { form } = useStyles()
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

                {({ values }) => (
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
                        <Button type="submit">
                            Change password
                        </Button>
                    </Form>
                )}



            </Formik>
        </div>
    )
}

export default CustomerChangePassword
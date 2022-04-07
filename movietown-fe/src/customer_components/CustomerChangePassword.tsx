import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MTextField from '../components/forms/formComponents/TextField';

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
    return (
        <div>
            <Formik
                initialValues={{
                    old_password: '',
                    new_password: ''
                }}

                validationSchema={PasswordValidation}
                onSubmit={(values) => console.log(values)}
            >

                {({ values }) => (
                    <Form>
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
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default CustomerChangePassword
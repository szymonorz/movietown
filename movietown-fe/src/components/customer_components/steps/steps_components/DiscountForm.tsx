import React, { useEffect, useState } from 'react'
import { discount, getDiscounts } from '../../../../api/ReservationApi'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import { Input, TextField } from '@material-ui/core';

interface DiscountFormProps {
    onChange: (discountId: number) => void,
}

const validateSeatForm = () => Yup.object().shape({
    normalSeats: Yup.number().positive("Number cannot be negative").required("Required"),
    childrenSeats: Yup.number().positive("Number cannot be negative").required("Required"),
    studentSeats: Yup.number().positive("Number cannot be negative").required("Required"),
    elderlySeats: Yup.number().positive("Number cannot be negative").required("Required")
})

const DiscountForm: React.FC<{}> = () => {
    const [discounts, setDiscounts] = useState<Array<discount>>([])
    useEffect(() => {
        getDiscounts()
            .then(({ data }) => setDiscounts([...data]))
            .catch((err) => console.error(err))
    }, [])

    return (
        <Formik
            initialValues={{
                normalSeats: 0,
                childrenSeats: 0,
                studentSeats: 0,
                elderlySeats: 0
            }}
            validationSchema={validateSeatForm}
            onSubmit={(values) => console.log(values)}
        >
            {({ values, handleChange, handleBlur }) => (
                <Form>
                    <TextField
                        name='normalSeats'
                        type='number'
                        InputProps={{inputProps: {min: 0, max: 100}}}
                        value={values.normalSeats}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        name='childrenSeats'
                        type='number'
                        InputProps={{inputProps: {min: 0, max: 100}}}
                        value={values.childrenSeats}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        name='studentSeats'
                        type='number'
                        InputProps={{inputProps: {min: 0, max: 100}}}
                        value={values.studentSeats}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        name='elderlySeats'
                        type='number'
                        InputProps={{inputProps: {min: 0, max: 100}}}
                        value={values.elderlySeats}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Form>

            )}


        </Formik>

    )
}

export default DiscountForm
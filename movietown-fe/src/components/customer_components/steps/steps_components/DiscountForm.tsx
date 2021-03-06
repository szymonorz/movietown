import React, { useContext, useEffect, useRef, useState } from 'react'
import { CustomerReservationContext, discount, discounts, getDiscounts } from '../../../../api/ReservationApi'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import { TextField, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    form: {
        display: "flex",
        flexDirection: "column"
    },
    input: {
        display: "flex",
        flexDirection: "row",
        color: "white"
    },
    label: {
        margin: "8px 10px 0 10px",
        float: "left"
    }
}))

interface DiscountFormProps {
    setNumberOfSeats: (arg: number) => void
}

const DiscountForm: React.FC<DiscountFormProps> = ({ setNumberOfSeats }) => {
    const { form, input, label } = useStyles()
    const provider = useContext(CustomerReservationContext)
    const discountSeats = provider!.customerReservation.discounts
    useEffect(() => {
        const sum = +discountSeats.normal_seats
            + +discountSeats.children_seats
            + +discountSeats.student_seats
            + +discountSeats.elderly_seats
        setNumberOfSeats(sum)
    }, [discountSeats])

    return (
        <Formik
            initialValues={provider!.customerReservation.discounts}
            onSubmit={(values) => console.log(values)}
        >
            {({ handleBlur }) => (
                <Form className={form}>
                    <div className={input}>
                        <Grid item xs={4}>
                            <Typography className={label}>
                                Zwykłe:
                            </Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='normal_seats'
                                type='number'
                                InputProps={{ inputProps: { min: 0, max: 100 }, className: input }}
                                value={discountSeats.normal_seats}
                                onChange={(event) => {
                                    const val = parseInt(event.target.value)
                                    if (!isNaN(val)){
                                        provider!.setCustomerReservation(prev => {
                                            return {
                                                ...prev,
                                                discounts: {
                                                    ...prev.discounts,
                                                    normal_seats: val
                                                }
                                            }
                                        })

                                    }
                                }
                                }
                                onBlur={handleBlur}
                            />

                        </Grid>

                    </div>
                    <div className={input}>
                        <Grid item xs={4}>
                            <Typography className={label}>
                                Dziecięce:
                            </Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='children_seats'
                                type='number'
                                InputProps={{ inputProps: { min: 0, max: 100 }, className: input }}
                                value={discountSeats.children_seats}
                                onChange={(event) => {
                                    const val = parseInt(event.target.value)
                                    if (!isNaN(val)){
                                        provider!.setCustomerReservation(prev => {
                                            return {
                                                ...prev,
                                                discounts: {
                                                    ...prev.discounts,
                                                    children_seats: val
                                                }
                                            }
                                        })

                                    }
                                }
                                }
                                onBlur={handleBlur}
                            />

                        </Grid>
                    </div>
                    <div className={input}>
                        <Grid item xs={4}>
                            <Typography className={label}>
                                Studenckie:
                            </Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='student_seats'
                                type='number'
                                InputProps={{ inputProps: { min: 0, max: 100 }, className: input }}
                                value={discountSeats.student_seats}
                                onChange={(event) => {
                                    const val = parseInt(event.target.value)
                                    if (!isNaN(val)){
                                        provider!.setCustomerReservation(prev => {
                                            return {
                                                ...prev,
                                                discounts: {
                                                    ...prev.discounts,
                                                    student_seats: val
                                                }
                                            }
                                        })

                                    }

                                }
                                }
                                onBlur={handleBlur}
                            />

                        </Grid>
                    </div>
                    <div className={input}>
                        <Grid item xs={4}>
                            <Typography className={label}>
                                Seniorskie
                            </Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='elderly_seats'
                                type='number'
                                InputProps={{ inputProps: { min: 0, max: 100 }, className: input }}
                                value={discountSeats.elderly_seats}
                                onChange={(event) => {
                                    const val = parseInt(event.target.value)
                                    if (!isNaN(val)) {
                                        provider!.setCustomerReservation(prev => {
                                            return {
                                                ...prev,
                                                discounts: {
                                                    ...prev.discounts,
                                                    elderly_seats: val
                                                }
                                            }
                                        })

                                    }
                                }
                                }
                                onBlur={handleBlur}
                            />

                        </Grid>
                    </div>
                </Form>

            )}
        </Formik>

    )
}

export default DiscountForm
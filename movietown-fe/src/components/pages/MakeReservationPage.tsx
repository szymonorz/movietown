import { Stepper, Step, StepLabel, Button, makeStyles, styled, StepConnector } from '@material-ui/core'
import React, { useMemo, useState, useEffect } from 'react'
import ReservationSeatsFragment from '../customer_components/steps/ReservationSeatsFragment'
import { MakeReservationStep } from '../customer_components/steps/common'
import { CustomerReservationContext } from '../../api/ReservationApi'
import { useSearchParams, Navigate } from 'react-router-dom';
import { getScreeningById, screening } from '../../api/ScreeningApi';
import SelectSeatsFragment from '../customer_components/steps/SelectSeatsFragment'
import SummaryStep from '../customer_components/steps/SummaryStep'
import { stepConnectorClasses } from '@mui/material'
import { getCustomerInfo } from '../../api/CustomerApi'

const steps: MakeReservationStep[] = [
    {
        label: 'first'
    },
    {
        label: 'second'
    },
    {
        label: 'third'
    }
]

const useStyles = makeStyles(() => ({
    thing: {
        color: "white",
        backgroundColor: "#282c34",
    },
    input: {
        color: "white",
        '&:disabled': {
            color: "grey"
        }
    }
   
}))

const Connector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      backgroundColor: "black",
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
       
      backgroundColor: "black",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.grey[800],
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

const MakeReservationPage: React.FC<{}> = () => {
    const {thing, input} = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [screeningId, setScreeningId] = useState(0)
    const [nextDisabled, setNextDisabled] = useState<boolean>(true)
    const [reservationId, setReservationId] = useState<number | null>(null)
    const [loginState, setLoginState] = useState<boolean>(true)

    const [screening, setScreening] = useState<screening>({
        id: 0,
        mm_type: {
            id: 0,
            movie: {
                id: 0,
                title: '',
                director: '',
                description: '',
                length: 0,
                movie_types: []
            },
            movie_type: {
                price: 0,
                type: ''
            }
        },
        movie_hall: {
            id: 0,
            name: '',
            number_of_seats: 0
        },
        start_of_screening: new Date(),
    })

    const [customerReservation, setCustomerReservation] = useState({
        seat_ids: [] as number[],
        screening_id: 0,
        reservation_type_id: 1,
        discounts: {
            normal_seats: 0,
            children_seats: 0,
            student_seats: 0,
            elderly_seats: 0
        },
        seatsToChoose: 0
    })

    const provider = useMemo(() => ({ customerReservation, setCustomerReservation }),
        [customerReservation, setCustomerReservation])
    const discountSeats = provider!.customerReservation.discounts
    const [query] = useSearchParams()

    const handleNext = () => {
        setActiveStep(prevStep => prevStep + 1)
    }

    const handleBack = () => {
        if (activeStep) {
            setActiveStep(currStep => currStep - 1)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const infoPromise = getCustomerInfo(token)
            infoPromise.catch((err) => {
                console.error(err.response.status)
                if(err.response.status === 401){
                    setLoginState(false)
                    localStorage.removeItem("token")
                    console.log("hello?")
                }
            })
            const id = query.get("id")
            if (id) {
                setScreeningId(parseInt(id))
            }
        }else{
            setLoginState(false)
        }
       
    }, [])

    useEffect(() => {
        setCustomerReservation({
            ...customerReservation,
            screening_id: screeningId
        })
        getScreeningById(screeningId)
            .then(({ data }) => setScreening(data))
            .catch((err) => console.error(err))
    }, [screeningId])

    useEffect(() => {
        setCustomerReservation({
            ...customerReservation,
            discounts: discountSeats
        })
    }, [discountSeats])



    return (
        <div className={thing}>
            {!loginState && (<Navigate to="/signin"/>)}
            {reservationId == null && (
                <div>
                    <Stepper activeStep={activeStep} connector={<Connector/>} style={{background: "none"}}>
                        {steps.map((step, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel/>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <Button
                        className={input}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >Back</Button>
                    <Button
                        className={input}
                        disabled={nextDisabled}
                        onClick={handleNext}
                    >Next</Button>
                    <CustomerReservationContext.Provider value={provider}>
                        {activeStep === 0 && (
                            <div>
                                <ReservationSeatsFragment
                                    setNextDisabled={setNextDisabled}
                                    screening={screening}
                                />
                            </div>
                        )}
                        {activeStep === 1 && (
                            <div>
                                <SelectSeatsFragment
                                    setNextDisabled={setNextDisabled}
                                    numberOfSeats={screening.movie_hall.number_of_seats}
                                />
                            </div>
                        )}
                        {activeStep === steps.length - 1 && (
                            <SummaryStep
                                setNextDisabled={setNextDisabled}
                                screening={screening}
                                setReservationId={setReservationId} />
                        )}
                    </CustomerReservationContext.Provider>
                </div>
            )}
            {reservationId && (
                <div>
                    <div>Dziękujemy za twoje zamówienie. Do zobaczenia w krótce</div>
                    <div>Numer twojego zamówienia: {reservationId}</div>
                </div>
            )}

        </div>
    )
}


export default MakeReservationPage

import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import React, { useMemo, useState, useEffect } from 'react'
import ReservationSeatsFragment from '../customer_components/steps/ReservationSeatsFragment'
import { MakeReservationStep } from '../customer_components/steps/common'
import { CustomerReservationContext } from '../../api/ReservationApi'
import { useSearchParams } from 'react-router-dom';
import { getScreeningById, screening } from '../../api/ScreeningApi';
import SeatsGrid from '../customer_components/steps/SeatsGrid'
import SelectSeatsFragment from '../customer_components/steps/SelectSeatsFragment'

const steps: MakeReservationStep[] = [
    {
        label: 'first'
    },
    {
        label: 'second'
    },
    {
        label: 'thirs'
    }
]

const MakeReservationPage: React.FC<{}> = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [screeningId, setScreeningId] = useState(0)

    const [screening, setScreening] = useState<screening>({
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
        reservation_type_id: 0,
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
        const id = query.get("id")
        if (id) {
            setScreeningId(parseInt(id))
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
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    return (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Button
                disabled={activeStep === 0}
                onClick={handleBack}
            >Back</Button>
            <Button
                disabled={activeStep === steps.length - 1}
                onClick={handleNext}
            >Next</Button>
            <CustomerReservationContext.Provider value={provider}>
                {activeStep === steps.length - 1 && (
                    <div>Finished</div>
                )}
                {activeStep === 0 && (
                    <div>
                        <ReservationSeatsFragment
                            screening={screening}
                            customerReservation={customerReservation}
                            setCustomerReservation={setCustomerReservation} />
                    </div>
                )}
                {activeStep === 1 && (
                    <div>
                        <SelectSeatsFragment 
                        numberOfSeats={screening.movie_hall.number_of_seats}
                        />
                    </div>
                )}
            </CustomerReservationContext.Provider>

        </div>
    )
}


export default MakeReservationPage

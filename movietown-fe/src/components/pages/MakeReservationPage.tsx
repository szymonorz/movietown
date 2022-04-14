import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import ReservationSeatsFragment from '../customer_components/steps/ReservationSeatsFragment'
import { MakeReservationStep } from '../customer_components/steps/common'
import { CustomerReservationContext } from '../../api/ReservationApi'

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
    const [customerReservation, setCustomerReservation] = useState({
        seat_id: 0,
        screening_id: 0,
        reservation_type_id: 0,
        discounts: {
            normal_seats: 0,
            children_seats: 0,
            student_seats: 0,
            elderly_seats: 0
        }
    })

    const provider = useMemo(() => ({ customerReservation, setCustomerReservation }),
        [customerReservation, setCustomerReservation])

    const handleNext = () => {
        setActiveStep(prevStep => prevStep + 1)
    }

    const handleBack = () => {
        if (activeStep) {
            setActiveStep(currStep => currStep - 1)
        }
    }

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
                            customerReservation={customerReservation}
                            setCustomerReservation={setCustomerReservation} />
                    </div>
                )}
                {activeStep === 1 && (
                    <div>Second</div>
                )}
            </CustomerReservationContext.Provider>

        </div>
    )
}


export default MakeReservationPage

import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import React, { useState } from 'react'
import ChooseMovieType from '../customer_components/steps/ChooseMovieType'
import { MakeReservationStep } from '../customer_components/steps/common'

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
            {activeStep === steps.length - 1 && (
                <div>Finished</div>
            )}
            {activeStep === 0 && (
                <div>
                    <ChooseMovieType />
                </div>
            )}

        </div>
    )
}


export default MakeReservationPage

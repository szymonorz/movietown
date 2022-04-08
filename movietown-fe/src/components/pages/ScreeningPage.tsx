import React, { useState } from 'react'


const ScreeningPage: React.FC<{}> = () => {
    const currDate = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(currDate.getDate() + 1)
    const [date, setDate] = useState<Date>(new Date())
    setDate(date => tomorrow)
    return(
        <div>

        </div>
    )
}

export default ScreeningPage
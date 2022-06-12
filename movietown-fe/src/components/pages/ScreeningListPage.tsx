import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material';
import { getDates, getDaysScreenings, request_screening } from '../../api/ScreeningApi';
import ScreeningList from '../ScreeningList';
import { DatePickerLabel } from '../customer_components/DatePickerLabel';


const ScreeningListPage: React.FC<{}> = () => {
    const [date, setDate] = useState<Date | null>(new Date())
    const [screenings, setScreenings] = useState<request_screening[]>([])

    useEffect(() => {
        const [d, to] = getDates(date!)
        getDaysScreenings({
            from: d as Date,
            to: to
        }).then(({ data }) => {
            setScreenings([...data])
        }).catch((err) => console.error(err))

    }, [date])

    return (
        <div>
            <DatePickerLabel>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate as Date)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </DatePickerLabel>
            <ScreeningList screenings={screenings} />
        </div>
    )
}

export default ScreeningListPage
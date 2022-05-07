import { List } from '@material-ui/core';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material';
import { getDaysScreenings, screening } from '../../api/ScreeningApi';
import ScreeningList from '../ScreeningList';


const ScreeningListPage: React.FC<{}> = () => {
    const [date, setDate] = useState<Date | null>(new Date())
    const [screenings, setScreenings] = useState<screening[]>([])

    useEffect(() => {
        const to = new Date()
        console.log(date)
        to.setDate(date!.getDate() + 1)
        to.setHours(0)
        to.setMinutes(0)
        to.setSeconds(0)
        to.setMilliseconds(0)
        getDaysScreenings({
            from: date as Date,
            to: to
        }).then(({ data }) => {
            console.log(data)
            setScreenings(screenings => [...data])
        })
            .catch((err) => console.error(err))

    }, [date])

    return (
        <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Data seansu"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

            </LocalizationProvider>
            <ScreeningList screenings={screenings} />
        </div>
    )
}

export default ScreeningListPage
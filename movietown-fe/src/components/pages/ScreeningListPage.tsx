import { makeStyles } from '@material-ui/core';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material';
import { getDaysScreenings, screening } from '../../api/ScreeningApi';
import ScreeningList from '../ScreeningList';


const useStyles = makeStyles(() => ({
    datePickerLabel: {
        backgroundColor: "white",
        borderRadius: "8px",
        margin: "0 40% 0 40%"
    }
}))

const ScreeningListPage: React.FC<{}> = () => {
    const { datePickerLabel } = useStyles()
    const [date, setDate] = useState<Date | null>(new Date())
    const [screenings, setScreenings] = useState<screening[]>([])

    useEffect(() => {

        const d = date as Date
        const to = new Date(d)
        console.log(d)
        to.setDate(d.getDate() + 1)
        to.setHours(0)
        to.setMinutes(0)
        to.setSeconds(0)
        to.setMilliseconds(0)
        console.log(to)
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
            <div className={datePickerLabel}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        className={datePickerLabel}
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                </LocalizationProvider>
            </div>
            <ScreeningList screenings={screenings} />
        </div>
    )
}

export default ScreeningListPage
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

        const today = new Date     
        const d = today.getDay() === date!.getDay() ? today : date!
        const to = new Date(d)
        to.setDate(d.getDate() + 1)
        to.setHours(0)
        to.setMinutes(0)
        to.setSeconds(0)
        to.setMilliseconds(0)
        if(d.getDay() != today.getDay()){
            d.setHours(0)
            d.setMinutes(0)
            d.setSeconds(0)
            d.setMilliseconds(0)
        }
        getDaysScreenings({
            from: d as Date,
            to: to
        }).then(({ data }) => {
            setScreenings([...data])
        }).catch((err) => console.error(err))

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
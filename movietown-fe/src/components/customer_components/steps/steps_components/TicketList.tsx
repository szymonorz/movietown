import { List, makeStyles } from '@material-ui/core'
import React from 'react'
import { seat } from '../../../../api/ScreeningApi'

interface TicketListProps {
    seats: seat[]
}

const useStyles = makeStyles(() => ({
    ticket: {
        textAlign: "left",
        padding: "10px",
        border: "1px solid grey",
        marginBottom: "10px",
        width: "100%"
    },
    list: {
        width: "60%"
    }

}))

const TicketList: React.FC<TicketListProps> = ({ seats }) => {
    const { ticket, list } = useStyles()

    const generateTicketList = () => {
        return seats.map((seat, index) => {
            return (
                <div key={index} className={ticket}>
                    <div>Bilet: </div>
                    <div>Rząd: {seat.row_number}</div>
                    <div>Miejsce: {seat.seat_number}</div>
                </div>

            )
        })
    }
    return (
        <List className={list}>
            {generateTicketList()}
        </List>
    )
}

export default TicketList
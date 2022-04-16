import { List, makeStyles } from '@material-ui/core'
import React from 'react'

interface TicketListProps {
    seat_ids: number[]
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

const TicketList: React.FC<TicketListProps> = ({ seat_ids }) => {
    const { ticket, list } = useStyles()

    const generateTicketList = () => {
        return seat_ids.map((seat_id, index) => {
            const row = Math.floor((seat_id + 1) / 10) + 1
            const col = (seat_id + 1) % 10
            return (
                <div key={index} className={ticket}>
                    <div>Bilet: </div>
                    <div>Rząd: {row}</div>
                    <div>Miejsce: {col}</div>
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
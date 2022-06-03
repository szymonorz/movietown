import { List, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCustomerInfo, LoginStateContext } from '../../api/CustomerApi'
import { getCustomerReservations, reservation } from '../../api/ReservationApi'
import ReservationCard from './ReservationCard'

const useStyles = makeStyles(() => ({
    list: {
        backgroundColor: "#282c34",
        padding: "30px",
        borderRadius: "7px",
        width: "60%"
    },
    text: {
        color: "white",
        fontSize: "30px",
        fontWeight: "bold"
    }
}))

const CustomerReservations: React.FC<{}> = () => {
    const {list, text} = useStyles()
    const {loginState, setLoginState} = useContext(LoginStateContext)!
    const [customerReservations, setCustomerReservations] = useState<reservation[]>([])
    const navigate = useNavigate()

    const showCustomerReservations = (token : string) => {
        getCustomerReservations(token)
        .then(({data}) => setCustomerReservations([...data]))
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const infoPromise = getCustomerInfo(token)
            infoPromise.then(() => {
                showCustomerReservations(token)
            }).catch((err) => {
                    if (err.response.status === 401) {
                        setLoginState(false)
                        localStorage.removeItem("token")
                        navigate("/")
                    }
                })
        } else {
            setLoginState(false)
            navigate("/")
        }
    }, [loginState])

    return <List className={list}>
        {customerReservations.map((customerReservation, index) => {
            return <ReservationCard reservation={customerReservation} key={index}/>
        })}
        {customerReservations.length === 0 && (
           <div className={text}>
               Brak rezerwacji.
            </div>
        )}
    </List>
}

export default CustomerReservations
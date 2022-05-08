import { List, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCustomerInfo, LoginStateContext } from '../../api/CustomerApi'
import { customerReservation, getCustomerReservations, reservation } from '../../api/ReservationApi'
import ReservationCard from './ReservationCard'

const useStyles = makeStyles(() => ({
    list: {
        backgroundColor: "#282c34",
        padding: "30px",
        borderRadius: "7px",
        width: "60%"
    }
}))

const CustomerReservations: React.FC<{}> = () => {
    const {list} = useStyles()
    const {loginState, setLoginState} = useContext(LoginStateContext)!
    const [authorized, setAuthorized] = useState<boolean>(true)
    const [tokenString, setTokenString] = useState<string | null>(null)
    const [customerReservations, setCustomerReservations] = useState<reservation[]>([])
    const navigate = useNavigate()

    const showCustomerReservations = (token : string) => {
        console.log(token)
        getCustomerReservations(token)
        .then(({data}) => setCustomerReservations([...data]))
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        // console.log(token)
        if (token) {
            // console.log(token)
            const infoPromise = getCustomerInfo(token)
            infoPromise.then(() => {
                showCustomerReservations(token)
            }).catch((err) => {
                    if (err.response.status === 401) {
                        setAuthorized(false)
                        setLoginState(false)
                        localStorage.removeItem("token")
                        navigate("/")
                    }
                })
        } else {
            setLoginState(false)
            setAuthorized(false)
            navigate("/")
        }
    }, [loginState])

    return <List className={list}>
        {customerReservations.map((customerReservation, index) => {
            return <ReservationCard reservation={customerReservation} key={index}/>
        })}
    </List>
}

export default CustomerReservations
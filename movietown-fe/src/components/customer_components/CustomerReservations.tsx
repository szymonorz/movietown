import { List, makeStyles } from '@material-ui/core'
import { styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCustomerInfo, LoginStateContext } from '../../api/CustomerApi'
import { getCustomerReservations, reservation } from '../../api/ReservationApi'
import ReservationCard from './ReservationCard'
import { CustomerContainer } from './StyledCustomerContainer'
import { StyledList } from './StyledList'

const useStyles = makeStyles(() => ({
    list: {
        backgroundColor: "#282c34",
        padding: "30px",
        borderRadius: "7px",
        
    },
    text: {
       
    }
}))

const ReservationList = styled(StyledList)({
    padding: "30px",
    borderRadius: "7px",
    width: "100%",
})

const NoReservationsText = styled('div')({
    color: "white",
    fontSize: "30px",
    fontWeight: "bold"
})

const CustomerReservations: React.FC<{}> = () => {
    const { list, text } = useStyles()
    const { loginState, setLoginState } = useContext(LoginStateContext)!
    const [customerReservations, setCustomerReservations] = useState<reservation[]>([])
    const navigate = useNavigate()

    const showCustomerReservations = (token: string) => {
        getCustomerReservations(token)
            .then(({ data }) => setCustomerReservations([...data]))
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

    return <CustomerContainer>
        <ReservationList>
            {customerReservations.map((customerReservation, index) => {
                return <ReservationCard reservation={customerReservation} key={index} />
            })}
            {customerReservations.length === 0 && (
                <NoReservationsText>
                    Brak rezerwacji.
                </NoReservationsText>
            )}
        </ReservationList>

    </CustomerContainer>
}

export default CustomerReservations
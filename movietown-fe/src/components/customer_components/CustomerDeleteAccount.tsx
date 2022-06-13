import { Button, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { deleteCustomerAccount, getCustomerInfo } from '../../api/CustomerApi'
import { CustomerContainer } from './StyledCustomerContainer'

const useStyles = makeStyles(() => ({
    container: {
        width: "50%",

    },
    element: {
        backgroundColor: "#282c34",
        padding: "30px",
        borderRadius: "10px",
        color: "white",
        height: "200px"
    },
    deleteButton: {
        marginTop: "50px",
        color: "red",
        fontWeight: "bold",
    }
}))

const CustomerDeleteAccount: React.FC<{}> = () => {
    const navigate = useNavigate()
    const { container, deleteButton, element } = useStyles()
    const [loginState, setLoginState] = useState<boolean>(true)
    const [tokenString, setTokenString] = useState<string>("")
    const [authorized, setAuthorized] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const infoPromise = getCustomerInfo(token)
            infoPromise.then(() => setTokenString(token as string))
                .catch((err) => {
                    if (err.response.status === 401) {
                        setAuthorized(false)
                        setLoginState(false)
                        localStorage.removeItem("token")
                        navigate("/signin?logged=false")
                    }
                })
        } else {
            setLoginState(false)
            setAuthorized(false)
            navigate("/signin?logged=false")
        }
    }, [loginState])

    const deleteAccount = () => {
        deleteCustomerAccount(tokenString)
            .then(({ data }) => {
                localStorage.removeItem("token")
                setAuthorized(false)
                setLoginState(false)
                navigate("/")
            })
            .catch((err) => setError(true))
    }

    return (
        <CustomerContainer>
            <div className={element}>
                <div>
                    Czy jesteś pewien, że chcesz usunąć swoje konto?
                    Wszystkie twoja dane zostaną utracone bez możliwości ich odzyskania.
                </div>
                <Button
                    className={deleteButton}
                    onClick={() => deleteAccount()}>
                    Tak, usuń moje konto teraz
                </Button>

                {error && (
                    <div>Coś poszło nie tak</div>
                )}

            </div>

        </CustomerContainer>
    )
}

export default CustomerDeleteAccount
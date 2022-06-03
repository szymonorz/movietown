import { List, ListItem, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { getCustomerInfo, LoginStateContext } from '../../api/CustomerApi'
import { StyledContainer } from '../customer_components/StyledContainer';
import { StyledLink } from '../customer_components/StyledLink';
import { StyledList } from '../customer_components/StyledList';
import { styled } from '@mui/material'

const CustomerPage: React.FC<{}> = () => {
    const provider = useContext(LoginStateContext)
    const { loginState, setLoginState } = provider!
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const infoPromise = getCustomerInfo(token)
            infoPromise.catch((err: { response: { status: number; }; }) => {
                if (err.response.status != 500) {
                    setLoginState(false)
                    localStorage.removeItem("token")
                }
            })
        }else{
            setLoginState(false)
        }
    }, [])

    return (
        <div>
            {!loginState && <Navigate to="/" />}
            <StyledContainer>
                <StyledList>
                    <ListItem>
                        <StyledLink replace to="info">
                            Edytuj informacje konta
                        </StyledLink>
                    </ListItem>
                    <ListItem >
                        <StyledLink replace to="password">
                            Zmień hasło
                        </StyledLink>
                    </ListItem>
                    <ListItem >
                        <StyledLink replace to="reservations">
                            Moje rezerwacje
                        </StyledLink>
                    </ListItem>
                    <ListItem>
                        <StyledLink replace to="delete">
                                Usuń konto
                        </StyledLink>
                    </ListItem>
                </StyledList>
                <Outlet />
            </StyledContainer>
        </div>
    )
}

export default CustomerPage
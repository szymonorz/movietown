import { Divider } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SignUpForm, { SignUpValues } from '../forms/SignUpForm';
import SignInForm, { SignInValues } from './../forms/SignInForm';
import AccessToken from '../../model/AccessToken';
import { loginCustomer, LoginStateContext, registerCustomer } from '../../api/CustomerApi';
import { Navigate } from 'react-router-dom';
import { StyledContainer } from '../customer_components/StyledContainer';
import { styled } from '@mui/material';


const StyledContainerElement = styled('div')({
    margin: "20px",
    width: "50%",
    padding: "30px",
    backgroundColor: "#282c34",
})

const SignInPage: React.FC<{}> = () => {
    const provider = useContext(LoginStateContext)
    const { loginState, setLoginState } = provider!
    const [loginError, setLoginError] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<boolean>(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token && token != "") {
            setLoginState(true)
        }
    }, [])


    const login = async (values: SignInValues) => {
        try {
            const { data } = await loginCustomer(values)
            const token = data as AccessToken
            localStorage.setItem("token", token.access_token)
            setLoginState(true)
        } catch (err: any) {
            setLoginError(true)
            setLoginState(false)
            console.error(err)
        }
    }

    const register = async (values: SignUpValues) => {
        try {
            const { data } = await registerCustomer(values)
            const token = data as AccessToken
            localStorage.setItem("token", token.access_token)
            setLoginState(true)
        } catch (err) {
            setRegisterError(true)
            setLoginState(false)
            console.log(err)
        }
    }

    return (
        <StyledContainer>
            {loginState && <Navigate replace to="/" />}
            <StyledContainerElement>
                <SignInForm
                    loginError={loginError}
                    onSubmit={(values: SignInValues) => login(values)}
                />
            </StyledContainerElement>
            <Divider orientation='vertical' flexItem />
            <StyledContainerElement>
                <SignUpForm
                    registerError={registerError}
                    onSubmit={(values: SignUpValues) => register(values)}
                />
            </StyledContainerElement>
        </StyledContainer>
    )
}

export default SignInPage
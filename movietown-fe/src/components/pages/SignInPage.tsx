import { Divider, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SignUpForm, { SignUpValues } from '../forms/SignUpForm';
import SignInForm, { SignInValues } from './../forms/SignInForm';
import AccessToken from '../../model/AccessToken';
import { loginCustomer, LoginStateContext, registerCustomer } from '../../api/CustomerApi';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { StyledContainer } from '../customer_components/StyledContainer';
import { styled } from '@mui/material';
import { border } from '@mui/system';


const StyledContainerElement = styled('div')({
    margin: "20px",
    width: "50%",
    padding: "30px",
    backgroundColor: "#282c34",
})

const UnauthorizedRedirectMessege = styled(Typography)({
    backgroundColor: "#ffaaaa",
    border: "1px solid red",
    color: "black",
    padding: "20px",
    margin: "20px"
})

const SignInPage: React.FC<{}> = () => {
    const [params] = useSearchParams()
    const provider = useContext(LoginStateContext)
    const { loginState, setLoginState } = provider!
    const [loginError, setLoginError] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<boolean>(false)
    const [unauthorizedRedirect, setUnauthorizedRedirect] = useState<boolean>(false) 
    useEffect(() => {
        if(params.get("logged") === "false"){
            setUnauthorizedRedirect(true)
        }
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
        <div>
            {unauthorizedRedirect && (<UnauthorizedRedirectMessege>
                Aby wyświetlić dany zasób trzeba posiadać konto w Movietown.
                Załóż konto, bądź zaloguj się jeżeli już posiadasz konto.

            </UnauthorizedRedirectMessege>)}
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
        </div>

       
    )
}

export default SignInPage
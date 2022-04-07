import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import SignUpForm, { SignUpValues } from '../forms/SignUpForm';
import SignInForm, { SignInValues } from './../forms/SignInForm';
import AccessToken from '../../model/AccessToken';
import {loginCustomer, registerCustomer} from '../../api/CustomerApi';
import {Navigate} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: "10px",
        border: "2px solid #B69BAA",
        boxShadow: "3px 3px 3px #B69BAA",
        backgroundColor: "#DBC2D0",
        margin: "100px"

    },
    containerElement: {
        margin: "20px",
        width: "50%",
        padding: "30px",

    }

}))

interface SignInPageProps{
    loginState: boolean,
    setLoginState: (arg: boolean) => void
}


const SignInPage: React.FC<SignInPageProps> = ({loginState, setLoginState}) => {
    const { container, containerElement } = useStyles()
    const [loginError, setLoginError] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<boolean>(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
          setLoginState(true)
          console.log("Logged in")
        }
      }, [])
   

    const login = async (values: SignInValues) => {
        try {
            const {data} = await loginCustomer(values)
            console.log(data)
            const token = data as AccessToken
            localStorage.setItem("token", token.access_token)
            setLoginState(true)
        } catch (err: any) {
            setLoginError(true)
            console.log(err)
        }
    }

    const register = async (values: SignUpValues) => {

        try {
            const {data} = await registerCustomer(values)
            const token = data as AccessToken
            console.log(token.access_token)
        } catch (err) {
            setRegisterError(true)
            console.log(err)
        }
    }

    return (
        <div className={container}>

            {loginState && <Navigate replace to="/"/>} 

            <SignInForm
                loginError={loginError}
                className={containerElement}
                onSubmit={(values: SignInValues) => login(values)}
            />
            <Divider orientation='vertical' flexItem />
            <SignUpForm
                registerError={registerError}
                className={containerElement}
                onSubmit={(values: SignUpValues) => register(values)}
            />
        </div>
    )
}

export default SignInPage
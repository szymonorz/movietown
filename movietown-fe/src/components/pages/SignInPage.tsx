import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import SignUpForm, { SignUpValues } from '../forms/SignUpForm';
import SignInForm, { SignInValues } from './../forms/SignInForm';
import AccessToken from '../../model/AccessToken';
import {instance, tokenValid} from '../../common/CustomerApi';
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



const SignInPage: React.FC<{}> = () => {
    const { container, containerElement } = useStyles()
    const [loginState, setLoginState] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token && tokenValid(token)) {
          setLoginState(true)
          console.log("Logged in")
        }
      }, [])
   

    const loginUser = async (values: SignInValues) => {
        try {
            const {data} = await instance.post("/customer/login", values)
            const token = data as AccessToken
            localStorage.setItem("token", token.access_token)
            setLoginState(true)
        } catch (err: any) {
            setLoginError(true)
            console.log(err)
        }
    }

    const registerUser = async (values: SignUpValues) => {

        try {
            const {data} = await instance.post("/customer/register", values)
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
                onSubmit={(values: SignInValues) => loginUser(values)}
            />
            <Divider orientation='vertical' flexItem />
            <SignUpForm
                registerError={registerError}
                className={containerElement}
                onSubmit={(values: SignUpValues) => registerUser(values)}
            />
        </div>
    )
}

export default SignInPage
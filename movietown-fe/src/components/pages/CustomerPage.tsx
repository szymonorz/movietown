import { List, ListItem, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { getCustomerInfo, LoginStateContext } from '../../api/CustomerApi'


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    list: {
        backgroundColor: "#282c34",
        margin: "0 150px 0 0",
        padding: "20px",
        width: "150px",
        height: "500px",
        borderRadius: "10px"
    },
    item: {
        borderBottom: ".5px solid #222222"
    },
    link: {
        color: "white",
        textDecoration: "none",
    }
}))


const CustomerPage: React.FC<{}> = () => {
    const { container, list, link, item } = useStyles()
    const provider = useContext(LoginStateContext)
    const { loginState, setLoginState } = provider!
    useEffect(() => {
        const token = localStorage.getItem("token") || ""
        if (token) {
            const infoPromise = getCustomerInfo(token)
            infoPromise.catch((err: { response: { status: number; }; }) => {
                console.error(err.response.status)
                if (err.response.status === 401) {
                    setLoginState(false)
                    localStorage.removeItem("token")
                    console.log("hello?")
                }
            })
        }
    }, [])

    return (
        <div>
            {!loginState && <Navigate to="/" />}
            <div className={container}>
                <List className={list}>
                    <ListItem className={item}>
                        <Link className={link} replace to="info">
                            Edytuj informacje konta
                        </Link>
                    </ListItem>
                    <ListItem className={item}>
                        <Link className={link} replace to="password">
                            Zmień hasło
                        </Link>
                    </ListItem>
                    <ListItem className={item}>
                        <Link className={link} replace to="delete">
                                Usuń konto
                        </Link>
                    </ListItem>
                </List>
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerPage
import { List, ListItem, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getCustomerInfo } from '../../api/CustomerApi'


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row"
    },
    list: {
        backgroundColor: "#282c34",
        margin: "0 25% 0 3%",
        padding: "20px",
        borderRadius: "10px"
    },
    item: {
        borderBottom: ".5px solid #222222",
        width: "100%"
    },
    link: {
        color: "white",
        textDecoration: "none",
    }
}))


interface CustomerPageProps {
    setLoginState: (arg: boolean) => void
}

const CustomerPage: React.FC<CustomerPageProps> = ({ setLoginState }) => {
    const { container, list, link, item } = useStyles()

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
            <div className={container}>
                <List className={list}>
                    <ListItem className={item}>
                        <Link  className={link} replace to="info">
                            Account information
                        </Link>
                    </ListItem>
                    <ListItem className={item}>
                        <Link className={link} replace to="password">
                            Change password
                        </Link>
                    </ListItem>
                </List>
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerPage
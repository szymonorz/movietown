import { List, ListItem, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getCustomerInfo } from '../../api/CustomerApi'


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
    }
}))


interface CustomerPageProps {
    setLoginState: (arg: boolean) => void
}

const CustomerPage: React.FC<CustomerPageProps> = ({ setLoginState }) => {
    const { container } = useStyles()

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
                    // navigate({pathname: "../../"})
                }
            })
        }
    }, [])

    return (
        <div>
            <div className={container}>
                <List>
                    <ListItem>
                        <Link replace to="info">
                            Account information
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link replace to="password">
                            Change password
                        </Link>
                    </ListItem>
                    <ListItem>
                        CCCCCCCCCCC
                    </ListItem>
                    <ListItem>
                        DDDDDDDDDDD
                    </ListItem>
                </List>
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerPage
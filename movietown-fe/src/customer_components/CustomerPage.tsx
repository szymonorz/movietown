import { List, ListItem, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import CustomerAccount from './CustomerAccount';


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
    }
}))

const CustomerPage: React.FC<{}> = () => {
    const {container} = useStyles()
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
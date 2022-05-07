import { Button, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


let headersData = [
    {
        label: "Sign In",
        href: "/signin"
    },
    {
        label: "Screenings",
        href: "/screening"
    },
    {
        label: "Log out",
        href: "/logout"
    }
]

const useStyles = makeStyles(() => ({
    header: {
        marginBottom: "30px",
        backgroundColor: "#282c34"
    },
    logo: {
        fontFamily: "Helvetica",
        fontWeight: "bold",
        textDecoration: "none",
        color: "white",
        textShadow: `-2px 2px 2px #A51272,
                      2px 2px 2px #A51272,
                      2px -2px 2px #A51272,
                      -2px -2px 10px #A51272`,
        background: "#282c34"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },

    menuButton: {
        fontWeight: "bold",
        height: "50px",
        fontSize: "13px",
        background: "#A51272",
        '&:hover': {
            backgroundColor: "#A51272",
        },
        color: "white",
        margin: "0 5px 0 5px"
    },
    pain: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "spaceBetween"
    },
    search: {
        background: "white"
    }
}))

interface HeaderProps {
    loggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
    const { header, logo, toolbar, menuButton, pain, search } = useStyles()

    const movieTownLogo = (
        <Typography
            {...{
                variant: "h5",
                component: "h1",
                className: logo
            }}>
            MovieTown
        </Typography>
    )
    const makeButtons = () => {
        return headersData.map(({ label, href }) => {
            if (loggedIn && href === "/signin") {
                href = "/account/info"
                label = "My account"
                return (
                    <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        className: menuButton,
                        component: Link
                    }}>
                    {label}
                    </Button>
                )
            } else if(loggedIn && href === "/logout"){
                return (
                    <Button
                    {...{
                        key: "Logout",
                        color: "inherit",
                        className: menuButton
                    }}
                    onClick={() => {
                        localStorage.removeItem("token")

                    }}
                >
                    Log out
                </Button>
                )
            }else if( href !== "/logout"){
                return (
                    <Button
                        {...{
                            key: label,
                            color: "inherit",
                            to: href,
                            className: menuButton,
                            component: Link
                        }}>
                        {label}
                    </Button>
                )
            }
        })
    }

    const displayButtons = () => {
        return (
            <Toolbar className={toolbar}>
                <Link to={"/"} className={logo}>
                    {movieTownLogo}
                </Link>
                <div className={pain}>
                    <SearchBar
                        onSubmit={setSearchQuery} />
                    {makeButtons()}
                </div>
            </Toolbar>
        )
    }
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (searchQuery != "") {
            navigate({
                pathname: '/search',
                search: `?title=${searchQuery}`
            })
        }
    }, [searchQuery])

    return (
        <div className={header}>
            {displayButtons()}
        </div>
    )
}

export default Header
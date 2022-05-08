import { Button, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginStateContext } from '../api/CustomerApi';
import SearchBar from './SearchBar';


let headersData = [
    {
        label: "Zaloguj się",
        href: "/signin"
    },
    {
        label: "Seanse",
        href: "/screening"
    },
    {
        label: "Wyloguj się",
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

const Header: React.FC<{}> = () => {
    const { header, logo, toolbar, menuButton, pain, search } = useStyles()
    const {loginState, setLoginState} = useContext(LoginStateContext)!
    const navigate = useNavigate()
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
            if (loginState && href === "/signin") {
                href = "/account/info"
                label = "Moje konto"
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
            } else if(loginState && href === "/logout"){
                return (
                    <Button
                    {...{
                        key: label,
                        color: "inherit",
                        className: menuButton
                    }}
                    onClick={() => {
                        localStorage.removeItem("token")
                        setLoginState(false)
                       
                        navigate("/")

                    }}
                >
                    {label}
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
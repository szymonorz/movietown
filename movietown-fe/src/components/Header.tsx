import { Button, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { getQueriedMovies } from '../api/MovieApi';


let headersData = [
    {
        label: "Sign In",
        href: "/signin"
    },
    {
        label: "Repertuar",
        href: "/screenings"
    }
]

const useStyles = makeStyles(() => ({
    header: {
        marginBottom: "30px",
    },
    logo: {
        fontFamily: "Helvetica",
        fontWeight: "bold",
        textDecoration: "none",
        color: "#A51272",
        background: "white"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },

    menuButton: {
        fontWeight: "bold",
        size: "24px",
        fontSize: "18px",
        background: "#A51272",
        '&:hover': {
            background: "white",
            color: "#A51272",
        },
        color: "white",
        margin: "0 5px 0 5px"
    },
    pain: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "spaceBetween"
    }
}))

interface HeaderProps {
    loggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
    const { header, logo, toolbar, menuButton, pain } = useStyles()

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
            }
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
        })
        // } else {
        //     return (
        //         <Button
        //             {...{
        //                 className: menuButton,
        //                 to: "/account/info",
        //                 component: Link
        //             }}>
        //             My account
        //         </Button>
        //     )
        // }

    }

    const displayButtons = () => {
        return (
            <Toolbar className={toolbar}>
                <Link to={"/"} className={logo}>
                    {movieTownLogo}
                </Link>
                <div className={pain}>
                    <SearchBar
                        // setSubmitQuery={(val: string) => console.log(val)}
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
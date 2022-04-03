import { AppBar, Button, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';


const headersData = [
    {
        label: "Sign In",
        href: "/signin"
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
    }
}))

interface HeaderProps {
    loggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
    const { header, logo, toolbar, menuButton } = useStyles()

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
        if (!loggedIn) {
            return headersData.map(({ label, href }) => {
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
        }else{
            return (
                <Button 
                {...{
                    className: menuButton
                }}>
                    My account
                </Button>
            )
        }

    }

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                <Link to={"/"} className={logo}>
                    {movieTownLogo}
                </Link>
                <div>
                    {makeButtons()}
                </div>
            </Toolbar>
        )
    }


    return (
        <div className={header}>
            {displayDesktop()}
        </div>
    )
}

export default Header
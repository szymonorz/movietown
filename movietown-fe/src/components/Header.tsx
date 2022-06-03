import { Button, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginStateContext } from '../api/CustomerApi';
import { StyledLink } from './customer_components/StyledLink';
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

const StyledHeader = styled('div')({
    marginBottom: "30px",
    backgroundColor: "#282c34"
})

const MToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const SearchWrapper = styled('div')({
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween"
})

const Logo = styled(Typography)({
    fontFamily: "Helvetica",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
    textShadow: `-2px 2px 2px #A51272,
                    2px 2px 2px #A51272,
                    2px -2px 2px #A51272,
                    -2px -2px 10px #A51272`,
    background: "#282c34"
})

const MenuButton = styled(Button)({
    fontWeight: "bold",
    height: "50px",
    fontSize: "13px",
    background: "#A51272",
    '&:hover': {
        backgroundColor: "#A51272",
    },
    color: "white",
    margin: "0 5px 0 5px"
})

const Header: React.FC<{}> = () => {
    const {loginState, setLoginState} = useContext(LoginStateContext)!
    const navigate = useNavigate()
    const movieTownLogo = (
        <Logo
            {...{
                variant: "h5",
                component: "h1",
            }}>
            MovieTown
        </Logo>
    )
    const makeButtons = () => {
        return headersData.map(({ label, href }) => {
            if (loginState && href === "/signin") {
                href = "/account/info"
                label = "Moje konto"
                return (
                    <MenuButton
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: Link
                    }}>
                    {label}
                    </MenuButton>
                )
            } else if(loginState && href === "/logout"){
                return (
                    <MenuButton
                    {...{
                        key: label,
                        color: "inherit"
                    }}
                    onClick={() => {
                        localStorage.removeItem("token")
                        setLoginState(false)
                       
                        navigate("/")

                    }}
                >
                    {label}
                </MenuButton>
                )
            }else if( href !== "/logout"){
                return (
                    <MenuButton
                        {...{
                            key: label,
                            color: "inherit",
                            to: href,
                            component: Link
                        }}>
                        {label}
                    </MenuButton>
                )
            }
        })
    }

    const displayButtons = () => {
        return (
            <MToolbar>
                <StyledLink to={"/"}>
                    {movieTownLogo}
                </StyledLink>
                <SearchWrapper>
                    <SearchBar
                        onSubmit={setSearchQuery} />
                    {makeButtons()}
                </SearchWrapper>
            </MToolbar>
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

    return <StyledHeader>
            {displayButtons()}
        </StyledHeader>
}

export default Header
import React, { useState } from 'react';
import { IconButton, makeStyles, TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
    onSubmit: (query: string) => void
}

const useStyles = makeStyles(() => ({
    search: {
        background: "white",
        borderRadius: "10px"
    }
}))

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [query, setQuery] = useState<string>("")
    const {search} = useStyles()
    return (
        <div className={search}>
            <TextField
                onChange={({ currentTarget: { value } }) => setQuery(value)}
                placeholder={'Wyszukaj...'}
                variant={'outlined'}
            />
            <IconButton
                aria-label="search"
                onClick={() => {
                    console.log(query)
                    onSubmit(query)
                }}
            >
                <SearchIcon />
            </IconButton>
        </div>
    )
}

export default SearchBar
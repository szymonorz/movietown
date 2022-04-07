import React, { useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
    onSubmit: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [query, setQuery] = useState<string>("")
    return (
        <div>
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
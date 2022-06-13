import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getQueriedMovies, movie } from '../../api/MovieApi';
import MovieCard from '../MovieCard';
import { StyledList } from '../customer_components/StyledList';
import { styled } from '@mui/material';

interface MovieListProps {
    query: string
}

const MovieListHeader = styled('h1')({
    color: "white"
})

const MovieListPage: React.FC<{}> = () => {
    const [movies, setMovies] = useState<Array<movie>>([])
    const [params] = useSearchParams()
    const query = params.get("title") || ""
    useEffect(() => {
        getQueriedMovies(query)
            .then(({ data }) => {
                setMovies(movies => [...data])
            })
            .catch((err) => console.error(err))
    }, [query])

    const displayMovies = () => {
        return movies.map((movie, index) => {
            return (
                <MovieCard key={index} movie={movie} />
            )
        })
    }

    return (
        <div>
            <MovieListHeader>Wyniki wyszukiwania dla "{query}"</MovieListHeader>
            <StyledList>
                {displayMovies()}
            </StyledList>
        </div>
    )
}

export default MovieListPage
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getQueriedMovies } from '../../api/MovieApi';
import MovieCard, { movie } from '../MovieCard'

interface MovieListProps {
    query: string
}



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
                <div>
                    <MovieCard key={index} movie={movie} />
                </div>
            )
        })
    }

    return (
        <div>
            <h1>Wyniki wyszukiwania dla "{query}"</h1>
            {displayMovies()}
        </div>
    )
}

export default MovieListPage
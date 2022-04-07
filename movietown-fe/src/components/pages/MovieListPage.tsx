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
                const n = data as movie[]
                console.log("AAAA", n[0])
                setMovies(movies => [...movies, ...n])
            })
            .catch((err) => console.error(err))
    }, [query])

    const displayMovies = () => {
        console.log(movies)
        return movies.map((movie, index) => {
            // console.log("deez", movie, index)
            return (
                <div>
                    <MovieCard movie={movie} />

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
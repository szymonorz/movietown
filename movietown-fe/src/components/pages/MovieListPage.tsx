import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getQueriedMovies, movie } from '../../api/MovieApi';
import MovieCard from '../MovieCard';
import {List, makeStyles} from '@material-ui/core'

interface MovieListProps {
    query: string
}

const useStyles = makeStyles(() => ({
    list: {
        backgroundColor: "#282c34",
        marginLeft: "13%",
        marginRight: "13%",
        color: "white"
    }
}))


const MovieListPage: React.FC<{}> = () => {
    const {list} = useStyles()
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
        <div className={list}>
            <h1>Wyniki wyszukiwania dla "{query}"</h1>
            <List>
                {displayMovies()}
            </List>
        </div>
    )
}

export default MovieListPage
import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/movies"
})



export const getQueriedMovies = (query: string, page: number = 5, offset: number = 0) => {
    return instance.get("/", {
        params: {
            title: query,
            page: page,
            offset: offset
        }
    })
}
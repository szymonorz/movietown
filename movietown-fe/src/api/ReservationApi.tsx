import axios from 'axios'


const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/reservations"
})


export const getReservationTypes = async () => {
    return await instance.get("/types");
}
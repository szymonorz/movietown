import axios from 'axios';

export const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/"
})


export const tokenValid = async(token: string) => {
    const response = await axios.get("http://localhost:4000/api/v1/customer/info", {
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
  
      return response.status == 200
}
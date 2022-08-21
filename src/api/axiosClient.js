import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://anotepad-server.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default axiosClient


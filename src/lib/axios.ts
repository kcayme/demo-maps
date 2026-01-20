import axios from 'axios'

const BASE_API_URL = import.meta.env.VITE_API_URL

const AxiosClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

AxiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // log error
            const status = error.response.status
            const data = error.response.data
            console.error('Error response:', {
                status,
                data,
            })
        }

        return Promise.reject(error)
    }
)

export default AxiosClient

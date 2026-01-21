import axios from 'axios';

const OPENSTREET_API_URL = import.meta.env.VITE_OPENSTREET_API_URL;

console.log(OPENSTREET_API_URL);
const AxiosClient = axios.create({
    baseURL: OPENSTREET_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // log error
            const status = error.response.status;
            const data = error.response.data;
            console.error('Error response:', {
                status,
                data,
            });
        }

        return Promise.reject(error);
    }
);

export default AxiosClient;

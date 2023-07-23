import axios from 'axios';
import { API_BASE_URL, API_KEY } from './config';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    };
    return config;
});

export default axiosInstance;

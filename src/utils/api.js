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

export async function fetchNowPlayingMovies(page) {
    const res = await axiosInstance.get(`/movie/now_playing?page=${page}`);
    return res.data.results;
}

export async function fetchUpcomingMovies(page) {
    const res = await axiosInstance.get(`/movie/upcoming?page=${page}`);
    return res.data.results;
}

export async function fetchTopRatedMovies(page) {
    const res = await axiosInstance.get(`/movie/top_rated?page=${page}`);
    return res.data.results;
}

export async function fetchPopularMovies(page) {
    const res = await axiosInstance.get(`/movie/popular?page=${page}`);
    return res.data.results;
}

export async function fetchGenres() {
    const res = await axiosInstance.get(`/genre/movie/list`);
    const genresObj = Object.fromEntries(
        res.data.genres.map((x) => [x.id, x.name])
    );
    return genresObj;
}

export default axiosInstance;

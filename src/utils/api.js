import axios from 'axios';
import { API_BASE_URL, API_KEY } from './config';

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

const cache = {
	genres: null,
};

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
	if (cache.genres) return cache.genres;
	const res = await axiosInstance.get(`/genre/movie/list`);
	const genresObj = Object.fromEntries(
		res.data.genres.map((x) => [x.id, x.name])
	);
	cache.genres = genresObj;
	return genresObj;
}

export async function fetchTrending(period) {
	const res = await axiosInstance.get(`/trending/movie/${period}`);
	const data = res.data.results;
	return data;
}

export async function searchQuery(param) {
	const res = await axiosInstance.get('/search/movie', {
		params: { query: param },
	});
	return res.data.results;
}
/**
 *
 * @param {number} id
 * @returns {{adult,backdrop_path,budget,genres,original_language,original_title,overview,popularity,poster_path,release_date,spoken_languages,status,tagline,title,vote_average,vote_count}}
 */
export async function getMovieData(id) {
	const res = await axiosInstance.get(`/movie/${id}`);
	const data = res.data;
	return data;
}

export default axiosInstance;

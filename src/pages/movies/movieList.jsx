import { useEffect, useRef, useState } from 'react';
import css from './movieList.module.css';
import { MoviePanel } from '../../components/movie';
import { fetchGenres } from '../../utils/api';

function MovieList({ list }) {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState(null);
	const [nextPage, setNextPage] = useState(1);
	const [fetching, setFetching] = useState(false);

	const handleScroll = (e) => {
		const currentScrollPos = e.target.scrollTop + window.innerHeight;
		const offset = 800;
		//scrolling close to the bottom will fetch next set of movies
		if (currentScrollPos > e.target.scrollHeight - offset) fetchMovies();
	};

	const fetchMovies = async () => {
		if (fetching) return; //prevent multiple requests for the same page
		setFetching(true);

		const newMovies = await list(nextPage);
		setMovies((prevMovies) => [...prevMovies, ...newMovies]);
		setNextPage(nextPage + 1);

		setFetching(false);
	};

	//preload genres to display on movie card
	useEffect(() => {
		const getGenres = async () => {
			try {
				const fetchedGenres = await fetchGenres();
				setGenres(fetchedGenres);
			} catch (error) {
				console.error('Error fetching genres:', error);
			}
		};
		getGenres();
	}, []);
	//handle list changes
	useEffect(() => {
		setMovies([]);
		setNextPage(1);
		fetchMovies();
	}, [list]);

	if (!movies) return <span>Loading</span>;
	return (
		<div className={css.main} onScroll={handleScroll}>
			<div className={css.movieList}>
				{movies.map((movie, i) => (
					<MoviePanel key={i} {...movie} genreList={genres} />
				))}
			</div>
		</div>
	);
}

export default MovieList;

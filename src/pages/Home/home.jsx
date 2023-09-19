import { useEffect, useRef, useState } from 'react';
import { MoviePanel } from '../../components/movie';
import css from './home.module.css';
import { fetchGenres, fetchTrending } from '../../utils/api';

function Home() {
	const [genres, setGenres] = useState(null);
	const [movies, setMovies] = useState([]);
	const [trendingPeriod, setTrendingPeriod] = useState('day');
	const bottomEl = useRef(null);

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

	useEffect(() => {
		const fetchMovies = async () => {
			const newMovies = await fetchTrending(trendingPeriod);
			setMovies(newMovies);
		};
		fetchMovies();
	}, [trendingPeriod]);
	if (!movies.length) return;
	return (
		<div className={css.main}>
			<div
				className={css.banner}
				style={{
					backgroundImage: `url(${process.env.PUBLIC_URL}/media/home_banner.jpg)`,
				}}
			>
				<div className={css.headers}>
					<h2>Welcome.</h2>
					<h3>Millions of movies to discover. Explore now.</h3>
				</div>
			</div>
			<div className={css.trending}>
				<h2>Trending</h2>
				<input
					id='checkbox_toggle'
					type='checkbox'
					className={css.check}
					onChange={(e) => {
						setTrendingPeriod(e.target.checked ? 'week' : 'day');
					}}
				/>
				<div className={css.checkbox}>
					<label className={css.slide} htmlFor='checkbox_toggle'>
						<label
							className={css.toggle}
							htmlFor='checkbox_toggle'
						></label>
						<label className={css.text} htmlFor='checkbox_toggle'>
							Today
						</label>
						<label className={css.text} htmlFor='checkbox_toggle'>
							This week
						</label>
					</label>
				</div>
				<div className={css.movieList}>
					{movies.map((movie, i) => (
						<MoviePanel key={i} {...movie} genreList={genres} />
					))}
				</div>
				<div ref={bottomEl}></div>
			</div>
		</div>
	);
}

export default Home;

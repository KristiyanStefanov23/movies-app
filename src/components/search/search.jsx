import { useEffect, useState } from 'react';
import { fetchGenres, searchQuery } from '../../utils/api';
import css from './search.module.css';
import { MoviePoster } from '../image';
import { Link } from 'react-router-dom';

function Search() {
	const [results, setResults] = useState([]);
	const [genres, setGenres] = useState(null);

	const handleInputChange = async (e) => {
		const searchTerm = e.target.value;
		if (!searchTerm) {
			setResults([]);
			return;
		}
		try {
			const data = await searchQuery(searchTerm);
			setResults(data);
		} catch (error) {
			console.error('Error searching movies:', error);
		}
	};

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

	return (
		<div>
			<input
				pattern=''
				className={css.inp}
				type='text'
				placeholder='Search for movies...'
				onChange={handleInputChange}
				onClick={handleInputChange}
			/>
			<ul className={css.dropDown}>
				{results.map((movie, i) => (
					<li key={i} onClick={() => setResults([])}>
						<Link
							to={`/overview/${movie.id}-${movie.title
								.split(' ')
								.join('-')}`}
						>
							<MoviePoster
								posterPath={movie.poster_path}
								size={200}
							/>
							<div className={css.info}>
								<div>
									{movie.title}
									{/* <Rating rating={movie.vote_average} /> */}
								</div>
								<div className={css.genres}>
									{movie.genre_ids.map((genreId, idx) => (
										<span key={idx}>{genres[genreId]}</span>
									))}
									<span style={{ marginLeft: 'auto' }}>
										{movie.release_date
											.slice(2)
											.replaceAll('-', '/')}
									</span>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Search;

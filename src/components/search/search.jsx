import { useState } from 'react';
import { searchQuery } from '../../utils/api';
import { MoviePoster } from '../image';
import { Link } from 'react-router-dom';
import css from './search.module.css';
import { Rating } from '../rating';

function Search() {
	const [results, setResults] = useState([]);

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

	return (
		<div>
			<input
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
								<div className={css.title}>{movie.title}</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Search;

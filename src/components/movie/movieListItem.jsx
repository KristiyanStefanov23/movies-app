import { Link } from 'react-router-dom';
import css from './movieListItem.module.css';
import { useState, useEffect } from 'react';
import { getMovieData } from '../../utils/api';
import { MoviePoster } from '../image';
import { Rating } from '../rating';

function MovieListItem({ id }) {
	const [movie, setMovie] = useState({});
	const title = movie?.title?.split(' ').join('-');
	useEffect(() => {
		const getData = async () => {
			const movieData = await getMovieData(id);
			setMovie(movieData);
		};
		getData();
	}, [id]);
	return (
		<div>
			<Link to={`/overview/${id}-${title}`} className={css.item}>
				<MoviePoster posterPath={movie.poster_path} size={200} />
				<div className={css.info}>
					<h2>{movie.title}</h2>
					<div className={css.genres}>
						{Array.isArray(movie.genres) &&
							movie.genres.map(({ _, name }, i) => (
								<span key={i}>{name}</span>
							))}
					</div>
					<div className={css.stack}>
						<Rating
							className={css.stars}
							rating={movie.vote_average}
						/>
						<span>Released: {movie?.release_date}</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default MovieListItem;

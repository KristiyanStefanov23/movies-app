import { MoviePoster } from '../image';
import css from './moviePanel.module.css';
import { Rating } from '../rating';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function MoviePanel({
	id,
	release_date: date,
	poster_path: poster,
	title: movieTitle,
	vote_average: average,
	overview,
	genre_ids: genres,
	genreList,
}) {
	const [hasImage, setHasImage] = useState(true);
	const title = movieTitle?.split(' ').join('-');

	if (!genreList) return;
	return (
		<Link to={`/overview/${id}-${title}`} className={css.card}>
			<div
				className={css.posterImg}
				style={{ background: !hasImage ? '#000' : '' }}
			>
				<MoviePoster
					onErrorImg={() => setHasImage(false)}
					htmlClassName={css.poster}
					posterPath={poster}
					size={400}
				/>
			</div>
			<div className={css.info}>
				<div className={css.title}>{movieTitle}</div>
				<div>
					<div className={css.genres}>
						{genres.map((id) => (
							<span key={id}>-{genreList[id]}-</span>
						))}
					</div>
					<div className={css.props}>
						<div className={css.overview}>{overview}</div>
					</div>
					<div className={css.vote}>
						<Rating rating={average} />
						<div className={css.prop}>{date.slice(0, 4)}</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default MoviePanel;

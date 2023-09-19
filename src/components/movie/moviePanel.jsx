import { MoviePoster } from '../image';
import css from './moviePanel.module.css';
import { Rating } from '../raiting';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MoviePanel = ({
	id,
	release_date: date,
	poster_path: poster,
	title,
	vote_average: average,
	overview,
	genre_ids: genres,
	genreList,
}) => {
	const [hasImage, setHasImage] = useState(true);
	if (!genreList) {
		console.error('No genre list provided!');
		return <div></div>;
	}
	return (
		<Link
			to={`/overview/${id}-${title.split(' ').join('-')}`}
			className={css.card}
		>
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
				<div className={css.title}>{title}</div>
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
};

export default MoviePanel;

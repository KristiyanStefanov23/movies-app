import { useEffect, useState } from 'react';
import { getMovieData } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { MoviePoster } from '../../components/image';
import { BiBookmarkPlus as BookmarkAdd } from 'react-icons/bi';
import { BiBookmarkMinus as BookmarkRemove } from 'react-icons/bi';
import css from './overview.module.css';
import { bookmarks, history } from '../../utils/function';
import { Rating } from '../../components/raiting';

const regexId = /^(\d+)-[A-Za-z]+/;
function Overview() {
	const { id: urlId } = useParams();
	const regMatch = regexId.exec(urlId);
	const id = regMatch ? regMatch[1] : urlId;
	const [bookmarked, setBookmarked] = useState(false);
	const [movie, setMovie] = useState({});

	const handleBookmarkClick = () => {
		setBookmarked(!bookmarked);
		if (bookmarks.includes(id)) return bookmarks.remove(id);
		bookmarks.add(id);
	};

	useEffect(() => {
		const getData = async () => {
			const movieData = await getMovieData(id);
			setMovie(movieData);
			setBookmarked(bookmarks.includes(id));
		};
		getData();
		history.add(id);
	}, [id, urlId]);
	if (!movie) return;
	return (
		<div className={css.main}>
			<div className={css.portrait}>
				<MoviePoster posterPath={movie.poster_path} size={300} />
				<div className={css.smallScreenTitle}>
					<h2>{movie.title}</h2>
					<h3>{movie.tagline}</h3>
					<Rating className={css.stars} rating={movie.vote_average} />
				</div>
				<div className={css.properties}>
					<div onClick={handleBookmarkClick} className={css.bookmark}>
						{bookmarked ? (
							<span>
								<BookmarkRemove size={24} />
								Bookmarked
							</span>
						) : (
							<span>
								<BookmarkAdd size={24} />
								Bookmark
							</span>
						)}
					</div>
					<div className={css.propertiesList}>
						<div className={css.portraitItem}>
							<span>Released:</span> {movie?.release_date}
						</div>
						<div className={css.portraitItem}>
							<span>Status:</span> {movie?.status}
						</div>
						<div className={css.portraitItem}>
							<span>Language:</span>{' '}
							{movie?.original_language?.toUpperCase()}
						</div>
						<div className={css.portraitItem}>
							<span>Adult content:</span>{' '}
							{movie.adult ? 'Yes' : 'No'}
						</div>
						<div className={css.portraitItem}>
							<span>Budget:</span>
							{movie?.budget
								?.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
							$
						</div>
					</div>
				</div>
			</div>
			<div className={css.info}>
				<div className={css.bigScreenTitle}>
					<h2 className={css.title}>{movie.title}</h2>
					<h3>{movie.tagline}</h3>
					<Rating className={css.stars} rating={movie.vote_average} />
				</div>
				<div className={css.genres}>
					{Array.isArray(movie.genres) &&
						movie.genres.map(({ _, name }, i) => (
							<span key={i}>{name}</span>
						))}
				</div>
				<hr />
				<div className={css.overview}>{movie.overview}</div>
			</div>
		</div>
	);
}

export default Overview;

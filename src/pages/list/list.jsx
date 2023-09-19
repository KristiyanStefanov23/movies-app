import MovieListItem from '../../components/movie/movieListItem';
import css from './list.module.css';

function List({ list }) {
	console.log(list.get());
	if (!list.get().length)
		return (
			<div className={css.emptyMsg}>
				<h2>
					Nothing to see here... <br /> Start by bookmarking some
					movies
				</h2>
			</div>
		);
	return (
		<div className={css.list}>
			{list.get().map((movieId, i) => (
				<MovieListItem key={i} id={movieId} />
			))}
		</div>
	);
}

export default List;

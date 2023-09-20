import { MovieListItem } from '../../components/movie';
import css from './list.module.css';

function List({ list }) {
	if (!list.get().length)
		return (
			<div className={css.emptyMsg}>
				<h2>Nothing to see here... yet</h2>
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

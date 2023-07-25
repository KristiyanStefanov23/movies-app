import { MoviePoster } from '../image';
import css from './moviePanel.module.css';
import { Rating } from '../raiting';

function MoviePanel({
    release_date,
    backdrop_path,
    title,
    vote_average,
    overview
}) {
    return (
        <div className={css.card}>
            <div className={css.posterImg}>
                <MoviePoster htmlClassName={css.poster} posterPath={backdrop_path} size={400} />
            </div>
            <div className={css.info}>
                <div className={css.title}>{title}</div>
                <div className={css.props}>
                    <div className={css.overview}>{overview}</div>
                </div>
                <div className={css.vote}>
                    <Rating rating={vote_average} />
                    <div className={css.prop}>{release_date}</div>
                </div>
            </div>
        </div>

    );
}

export default MoviePanel;

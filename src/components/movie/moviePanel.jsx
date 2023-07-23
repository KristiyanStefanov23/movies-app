import { MoviePoster } from '../image';
import css from './moviePanel.module.css';

function MoviePanel({
    original_language,
    release_date,
    popularity,
    backdrop_path,
    title,
    vote_average,
    vote_count,
}) {
    return (
        <div className={css.card}>
            <div className={css.posterImg}>
                <MoviePoster posterPath={backdrop_path} size={500} />
            </div>
            <div className={css.info}>
                <div className={css.title}>{title}</div>
                <div className={css.prop}>{release_date}</div>
                <div className={css.prop}>{original_language}</div>
                <div className={css.prop}>{popularity}</div>
                <div className={css.vote}>
                    <div className={css.voteAvg}>{vote_average}</div>
                </div>
            </div>
        </div>
    );
}

export default MoviePanel;

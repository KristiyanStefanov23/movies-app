import { MoviePoster } from '../image';
import css from './moviePanel.module.css';
import { Rating } from '../raiting';

const MoviePanel = ({
    release_date: date,
    poster_path: poster,
    title,
    vote_average: average,
    overview,
    genre_ids: genres,
    genreList,
}) => (
    <div className={css.card}>
        <div className={css.posterImg}>
            <MoviePoster
                htmlClassName={css.poster}
                posterPath={poster}
                size={400}
            />
        </div>
        <div className={css.info}>
            <div className={css.title}>{title}</div>
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
);

export default MoviePanel;

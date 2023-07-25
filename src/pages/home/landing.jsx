import { useEffect, useState } from 'react';
import css from './landing.module.css';
import { MoviePanel } from '../../components/movie';
import axiosInstance from '../../utils/api';

function Landing() {
    const [list, setList] = useState(1);
    const [data, setData] = useState(null);
    const [genre, setGenre] = useState(null);

    const listOptions = ['now_playing', 'popular', 'top_rated', 'upcoming'];

    async function getListData() {
        setData(null);
        setGenre(null);
        const movies = await axiosInstance.get(`/movie/${listOptions[list]}`);
        const genreResp = await axiosInstance.get(`/genre/movie/list`);
        const genres = genreResp.data.genres;
        setData(movies.data.results);
        setGenre(Object.fromEntries(genres.map((x) => [x.id, x.name])));
    }

    useEffect(() => {
        getListData();
        return setData([]);
    }, [list]);

    if (!data) return <span>Loading</span>;
    return (
        <main className={css.main}>
            <ul className={css.nav}>
                <li onClick={() => setList(0)}>Now Plaing</li>
                <li onClick={() => setList(1)}>Popular</li>
                <li onClick={() => setList(2)}>Top Rated</li>
                <li onClick={() => setList(3)}>Upcoming</li>
            </ul>
            <div className={css.movieList}>
                {data.map((movie, i) => (
                    <MoviePanel key={i} {...movie} genreList={genre} />
                ))}
            </div>
        </main>
    );
}

export default Landing;

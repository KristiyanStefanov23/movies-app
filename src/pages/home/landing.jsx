import { useEffect, useState } from 'react';
import css from './landing.module.css';
import { MoviePanel } from '../../components/movie';
import axiosInstance from '../../utils/api';

function Landing() {
    const [list, setList] = useState(1);
    const [data, setData] = useState([]);

    const listOptions = ['now_playing', 'popular', 'top_rated', 'upcoming'];

    async function getListData() {
        const response = await axiosInstance.get(`/movie/${listOptions[list]}`);
        setData(response.data.results);
    }

    useEffect(() => {
        getListData();
        return setData([]);
    }, [list]);

    return (
        <main className={css.main}>
            <h1>Welcome</h1>
            <ul>
                <li onClick={() => setList(0)}>Now Plaing</li>
                <li onClick={() => setList(1)}>Popular</li>
                <li onClick={() => setList(2)}>Top Rated</li>
                <li onClick={() => setList(3)}>Upcoming</li>
            </ul>
            <div className={css.movieList}>
                {data.map((movie, i) => (
                    <MoviePanel key={i} {...movie} />
                ))}
            </div>
        </main>
    );
}

export default Landing;

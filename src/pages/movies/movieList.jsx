import { useEffect, useRef, useState } from 'react';
import css from './movieList.module.css';
import { MoviePanel } from '../../components/movie';
import { fetchGenres } from '../../utils/api';

function MovieList({ list }) {
    const loadingRef = useRef(null);

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState(null);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        console.log(lastScrollY, '>', currentScrollPos);
        setLastScrollY(currentScrollPos);
    };

    useEffect(() => {
        //preload genres to display on movie card
        const getGenres = async () => {
            try {
                const fetchedGenres = await fetchGenres();
                setGenres(fetchedGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        getGenres();
        // Add event listener to handle scrolling
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setMovies([]);
        let page = 1;
        //create observer that handles when to load data
        const observer = new IntersectionObserver(
            async (entries) => {
                const target = entries[0];
                //when the target is on the screen
                if (target.isIntersecting) {
                    //assign the data from that fetcher
                    const newMovies = await list(page);
                    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
                    page++;
                }
            },
            { threshold: 0.5 } //add a delay for the observer
        );
        // append the observer to the element at the bottom of the page
        if (loadingRef.current) observer.observe(loadingRef.current);
        // handle component dismount/remount
        return () => {
            if (loadingRef.current) observer.unobserve(loadingRef.current);
        };
    }, [list]);

    if (!movies) return <span>Loading</span>;
    return (
        <main className={css.main}>
            <header>
                <div>
                    <label>Sort By</label>
                    <select>
                        <option value="">Duration</option>
                    </select>
                </div>
            </header>
            <div className={css.movieList}>
                {movies.map((movie, i) => (
                    <MoviePanel key={i} {...movie} genreList={genres} />
                ))}
                <div ref={loadingRef}>Loading...</div>
            </div>
        </main>
    );
}

export default MovieList;

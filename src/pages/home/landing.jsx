import { useEffect, useRef, useState } from 'react';
import css from './landing.module.css';
import { MoviePanel } from '../../components/movie';
import { Search } from '../../components/search';
import {
    fetchGenres,
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
} from '../../utils/api';

function Landing() {
    //reference to the end of the movie list
    const loadingRef = useRef(null);

    //landing on Popular
    const [list, setList] = useState(1);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState(null);
    //handle scrolling for nav bar
    const [isNavVisible, setIsNavVisible] = useState(true);

    const handleScroll = () => {
        const isFixed = window.scrollY > 50; // Check if the user is not at the top
        setIsNavFixed(isFixed);
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
        console.log('change');
        let page = 1;
        //assign fetch function depending on the list
        const req = (() => {
            switch (list) {
                case 0:
                    return fetchNowPlayingMovies;
                case 2:
                    return fetchTopRatedMovies;
                case 3:
                    return fetchUpcomingMovies;
                default:
                case 1:
                    return fetchPopularMovies;
            }
        })();
        //fetch some data on load
        (async () => setMovies(await req(page++)))();
        //create observer that handles when to load data
        const observer = new IntersectionObserver(
            async (entries) => {
                const target = entries[0];
                //when the target is on the screen
                if (target.isIntersecting) {
                    //assign the data from that fetcher
                    const newMovies = await req(page++);
                    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
                }
            },
            { threshold: 0.5 } //add a delay for the observer
        );
        // append the observer to the element at the bottom of the page
        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }
        // handle component dismount/remount
        return () => {
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current);
            }
        };
    }, [list]);

    if (!movies) return <span>Loading</span>;
    return (
        <main className={css.main}>
            <header>
                <div className={css.headerRow}>
                    <div className={css.title}>
                        <h2 className={css.name}>TaleTwist</h2>
                    </div>
                    <Search setter={setMovies} />
                </div>
                <nav className={isNavFixed ? css.fixedNav : ''}>
                    <ul className={css.nav}>
                        <li onClick={() => setList(0)}>Now Plaing</li>
                        <li onClick={() => setList(1)}>Popular</li>
                        <li onClick={() => setList(2)}>Top Rated</li>
                        <li onClick={() => setList(3)}>Upcoming</li>
                    </ul>
                </nav>
            </header>
            <div className={css.movieList}>
                {movies.map((movie, i) => (
                    <MoviePanel key={i} {...movie} genreList={genres} />
                ))}
            </div>
            <div ref={loadingRef}>Loading...</div>
        </main>
    );
}

export default Landing;

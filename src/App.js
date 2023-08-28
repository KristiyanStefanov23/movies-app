import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Favorites from './pages/favorites/favorites';
import { NavFrame } from './pages/navigation';
import { MovieList } from './pages/movies';
import {
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
} from './utils/api';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<NavFrame />}>
                    <Route
                        exact
                        path="/favorites"
                        element={<Favorites />}
                    ></Route>
                    <Route
                        exact
                        path="/new"
                        element={<MovieList list={fetchNowPlayingMovies} />}
                    ></Route>
                    <Route
                        exact
                        path="/popular"
                        element={<MovieList list={fetchPopularMovies} />}
                    ></Route>
                    <Route
                        exact
                        path="/upcoming"
                        element={<MovieList list={fetchUpcomingMovies} />}
                    ></Route>
                    <Route
                        exact
                        index
                        element={<MovieList list={fetchTopRatedMovies} />}
                    ></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

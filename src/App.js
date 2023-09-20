import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieList } from './pages/movies';
import {
	fetchNowPlayingMovies,
	fetchPopularMovies,
	fetchTopRatedMovies,
	fetchUpcomingMovies,
} from './utils/api';
import { Overview } from './pages/overview';
import { Home } from './pages/Home';
import { Frame } from './pages/frame';
import { List } from './pages/list';
import { bookmarks, history } from './utils/function';
import { NotFound } from './pages/notFound';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Frame />}>
					<Route exact index element={<Home />}></Route>
					<Route
						exact
						path='overview/:id'
						element={<Overview />}
					></Route>
					<Route
						exact
						path='bookmark'
						element={<List list={bookmarks} />}
					></Route>
					<Route
						exact
						path='history'
						element={<List list={history} />}
					></Route>
					<Route
						exact
						path='new'
						element={<MovieList list={fetchNowPlayingMovies} />}
					></Route>
					<Route
						exact
						path='popular'
						element={<MovieList list={fetchPopularMovies} />}
					></Route>
					<Route
						path='upcoming'
						element={<MovieList list={fetchUpcomingMovies} />}
					></Route>
					<Route
						exact
						path='top'
						index
						element={<MovieList list={fetchTopRatedMovies} />}
					></Route>
					<Route path='/*' element={<NotFound />}></Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;

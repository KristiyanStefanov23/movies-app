import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Favorites from './pages/favorites/favorites';
import { Landing } from './pages/home';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Landing />}></Route>
                <Route exact path="/favorites" element={<Favorites />}></Route>
            </Routes>
        </Router>
    );
}

export default App;

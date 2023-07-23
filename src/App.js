import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './pages/home';
import Favorites from './pages/favorites/favorites';

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

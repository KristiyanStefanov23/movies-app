import { useState } from 'react';
import axiosInstance from '../../utils/api';
import css from './search.module.css';

function Search() {
    const [results, setResults] = useState([]);

    const handleInputChange = async (e) => {
        const searchTerm = e.target.value;
        if (!searchTerm) return setResults([]);
        try {
            const response = await axiosInstance.get('/search/movie', {
                params: { query: searchTerm },
            });
            setResults(response.data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for movies..."
                onChange={handleInputChange}
            />
            <ul>
                {results.map((movie, i) => (
                    <li key={i}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;

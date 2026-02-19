import { useState, useEffect } from 'react';
import './Row.css';
import MovieCard from './MovieCard';

const Row = ({ title, fetchUrl, isLargeRow = false, toggleFavorite, isFavorite, onShowDetails }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setMovies(data.results || []);
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <div key={movie.id} className="row__item">
                            <MovieCard
                                movie={movie}
                                isRowItem={true}
                                isLarge={isLargeRow}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite}
                                onShowDetails={onShowDetails}
                            />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Row;

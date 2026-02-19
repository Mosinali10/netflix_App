import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('movie_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('movie_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        setFavorites(prev => {
            const isFavorite = prev.some(f => f.id === movie.id);
            if (isFavorite) {
                return prev.filter(f => f.id !== movie.id);
            } else {
                return [...prev, movie];
            }
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some(f => f.id === movieId);
    };

    return { favorites, toggleFavorite, isFavorite };
};

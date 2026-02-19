import MovieCard from './MovieCard';

const MovieList = ({ movies, toggleFavorite, isFavorite, onShowDetails }) => {
  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <h2>No movies found in this list.</h2>
        <p>Start exploring and add some to your favorites!</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onShowDetails={onShowDetails}
        />
      ))}

      <style dangerouslySetInnerHTML={{
        __html: `
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 2rem;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .no-movies {
          text-align: center;
          padding: 5rem 2rem;
          color: var(--text-muted);
        }
        .no-movies h2 {
          color: white;
          margin-bottom: 1rem;
        }

        @media (max-width: 600px) {
          .movie-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
            padding: 1rem;
          }
        }
      `}} />
    </div>
  );
};

export default MovieList;

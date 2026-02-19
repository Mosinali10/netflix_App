import { Star, Calendar, Heart } from 'lucide-react';

const MovieCard = ({ movie, toggleFavorite, isFavorite, onShowDetails, isRowItem = false, isLarge = false }) => {
  const imageUrl = isLarge
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`;

  const favorite = isFavorite(movie.id);

  return (
    <div className={`movie-card ${isRowItem ? 'row-item' : ''} ${isLarge ? 'large' : ''}`} onClick={() => onShowDetails(movie)}>
      <div className="poster-wrapper">
        <img src={imageUrl} alt={movie.title} loading="lazy" />
        <div className="overlay">
          <div className="overlay-content">
            <h4 className="movie-title-short">{movie.title || movie.name}</h4>
          </div>
        </div>
        <button
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
        >
          <Heart size={16} fill={favorite ? "currentColor" : "none"} />
        </button>
        {movie.vote_average > 0 && (
          <div className="rating-badge">
            <Star size={10} fill="currentColor" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
      {!isRowItem && (
        <div className="movie-info">
          <h3>{movie.title || movie.name}</h3>
          <div className="footer-info">
            <span className="release-date">
              <Calendar size={14} />
              {(movie.release_date || movie.first_air_date)?.split('-')[0] || 'N/A'}
            </span>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .movie-card {
          background: #111;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 450ms;
          cursor: pointer;
          position: relative;
        }
        .movie-card:hover {
          transform: scale(1.08);
          z-index: 10;
        }
        .row-item {
            width: 250px;
        }
        .row-item.large {
            width: 180px;
        }
        .poster-wrapper {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .large .poster-wrapper {
            aspect-ratio: 2/3;
        }
        .poster-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          opacity: 0;
          transition: opacity 0.3s;
          display: flex;
          align-items: flex-end;
          padding: 10px;
        }
        .movie-card:hover .overlay {
          opacity: 1;
        }
        .movie-title-short {
            font-size: 0.8rem;
            color: white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
        }
        .favorite-btn {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0,0,0,0.5);
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .movie-card:hover .favorite-btn {
            opacity: 1;
        }
        .favorite-btn.active {
          color: #e50914;
          opacity: 1;
        }
        .rating-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.7);
          padding: 2px 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 3px;
          color: #ffc107;
          font-weight: bold;
          font-size: 0.7rem;
          z-index: 2;
        }
        .movie-info { padding: 10px; }
        .movie-info h3 { font-size: 0.9rem; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .footer-info { color: #999; font-size: 0.8rem; }
      `}} />
    </div>
  );
};

export default MovieCard;

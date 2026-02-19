import { X, Play, Plus, ThumbsUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieModal = ({ movie, onClose, toggleFavorite, isFavorite }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (movie && movie.id) {
      // Determine if it's a TV show or Movie (TMDB discover/tv doesn't include media_type)
      const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');

      fetch(`https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          const trailer = data.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&rel=0&controls=1`);
          }
        })
        .catch(err => console.error("Error fetching trailer:", err));
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>

        <div className="modal-hero">
          {(trailerUrl && playing) ? (
            <iframe
              className="modal-trailer"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="modal-backdrop" style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path})`
            }}>
              {!playing && trailerUrl && (
                <div className="play-overlay" onClick={() => setPlaying(true)}>
                  <Play size={80} fill="white" />
                </div>
              )}
            </div>
          )}
          <div className="modal-hero-fade"></div>
          <div className="modal-hero-content">
            <h2>{movie.title || movie.name}</h2>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-play" onClick={() => setPlaying(true)}>
                <Play size={20} fill="black" /> Play
              </button>
              <button className="modal-btn-circle" onClick={() => toggleFavorite(movie)}>
                <Plus size={24} color={isFavorite(movie.id) ? "#e50914" : "white"} />
              </button>
              <button className="modal-btn-circle"><ThumbsUp size={24} /></button>
            </div>
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-meta">
            <span className="match">{(movie.vote_average * 10).toFixed(0)}% Match</span>
            <span className="year">{(movie.release_date || movie.first_air_date)?.split('-')[0]}</span>
            <span className="rating-tag">U/A 16+</span>
            <span className="quality">HD</span>
          </div>
          <p className="modal-overview">{movie.overview}</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-y: auto;
          padding: 50px 20px;
        }
        .modal-container {
          background: #181818;
          width: 100%;
          max-width: 850px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          animation: modalSlide 0.4s ease-out;
        }
        @keyframes modalSlide {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #181818;
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }
        .modal-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
        }
        .modal-trailer {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-backdrop {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .play-overlay {
            background: rgba(0,0,0,0.4);
            border-radius: 50%;
            padding: 20px;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
        }
        .play-overlay:hover {
            transform: scale(1.1);
            background: rgba(0,0,0,0.6);
        }
        .modal-hero-fade {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(transparent, #181818);
        }
        .modal-hero-content {
          position: absolute;
          bottom: 40px;
          left: 40px;
          z-index: 2;
        }
        .modal-hero-content h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: white;
        }
        .modal-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .modal-btn {
          padding: 10px 25px;
          border-radius: 4px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
        }
        .modal-btn-play {
          background: white;
          color: black;
        }
        .modal-btn-circle {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.4);
          background: rgba(30,30,30,0.6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        .modal-btn-circle:hover { border-color: white; }
        .modal-details {
          padding: 20px 40px 40px;
        }
        .modal-meta {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .match { color: #46d369; }
        .rating-tag { border: 1px solid rgba(255,255,255,0.4); padding: 0 8px; font-size: 0.8rem; }
        .quality { border: 1px solid rgba(255,255,255,0.4); padding: 0 5px; border-radius: 3px; font-size: 0.7rem; }
        .modal-overview {
          font-size: 1.1rem;
          line-height: 1.5;
          color: #e5e5e5;
        }
        @media (max-width: 600px) {
          .modal-hero-content h2 { font-size: 1.5rem; }
          .modal-hero-content { left: 20px; bottom: 20px; }
          .modal-details { padding: 20px; }
        }
      `}} />
    </div>
  );
};

export default MovieModal;

import { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Banner = ({ onMoreInfo }) => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await response.json();
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      setMovie(randomMovie);

      // Fetch trailer for auto-play
      if (randomMovie) {
        fetch(`https://api.themoviedb.org/3/${randomMovie.media_type === 'tv' ? 'tv' : 'movie'}/${randomMovie.id}/videos?api_key=${TMDB_API_KEY}`)
          .then(res => res.json())
          .then(vData => {
            const trailer = vData.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
            if (trailer) {
              setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&rel=0&showinfo=0`);
              // Show video after 3 seconds
              setTimeout(() => setShowVideo(true), 3000);
            }
          });
      }
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  if (!movie) return <div className="banner-skeleton" style={{ height: '80vh', background: '#111' }} />;

  return (
    <header className="banner">
      <div className="banner__background">
        {showVideo && trailerUrl ? (
          <div className="banner__video-container">
            <iframe
              className="banner__video"
              src={trailerUrl}
              title="Banner Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        ) : (
          <div
            className="banner__image"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            }}
          />
        )}
        <div className="banner--fadeBottom" />
      </div>

      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__stats">
          <span className="banner__match">{Math.floor(Math.random() * 20 + 80)}% Match</span>
          <span className="banner__year">{movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0]}</span>
          <span className="banner__rating">U/A 16+</span>
          <span className="banner__quality">HD</span>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
        <div className="banner__buttons">
          <button className="banner__button banner__button--play" onClick={() => onMoreInfo(movie)}>
            <Play size={20} fill="black" /> Play
          </button>
          <button className="banner__button banner__button--info" onClick={() => onMoreInfo(movie)}>
            <Info size={20} /> More Info
          </button>
        </div>
      </div>

      {showVideo && (
        <button className="banner__mute-btn" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .banner {
          height: 85vh;
          position: relative;
          color: white;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #000;
        }
        .banner__background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .banner__image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center center;
          transition: opacity 1s ease-in-out;
        }
        .banner__video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .banner__video {
          width: 100vw;
          height: 56.25vw; /* 16:9 aspect ratio */
          min-height: 100vh;
          min-width: 177.77vh;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .banner__contents {
          margin-left: 50px;
          max-width: 600px;
          z-index: 10;
          transition: transform 0.3s;
        }
        .banner__title {
          font-size: 4rem;
          font-weight: 800;
          padding-bottom: 0.3rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
        }
        .banner__stats {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 1rem;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .banner__match { color: #46d369; }
        .banner__rating { border: 1px solid rgba(255,255,255,0.4); padding: 0 5px; font-size: 0.7rem; }
        .banner__quality { border: 1px solid rgba(255,255,255,0.4); padding: 0 5px; border-radius: 3px; font-size: 0.7rem; }
        .banner__description {
          line-height: 1.4;
          padding-top: 1rem;
          font-size: 1.2rem;
          max-width: 500px;
          font-weight: 400;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.8);
        }
        .banner__buttons {
          margin-top: 1.5rem;
          display: flex;
          gap: 12px;
        }
        .banner__button {
          cursor: pointer;
          color: white;
          outline: none;
          border: none;
          font-weight: 700;
          border-radius: 4px;
          padding: 0.8rem 2.2rem;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
          font-size: 1.1rem;
        }
        .banner__button--play {
          background-color: white;
          color: black;
        }
        .banner__button--play:hover {
          background-color: rgba(255, 255, 255, 0.75);
          transform: scale(1.05);
        }
        .banner__button--info {
          background-color: rgba(109, 109, 110, 0.7);
        }
        .banner__button--info:hover {
          background-color: rgba(109, 109, 110, 0.4);
          transform: scale(1.05);
        }
        .banner__mute-btn {
          position: absolute;
          right: 50px;
          bottom: 150px;
          background: rgba(0,0,0,0.3);
          border: 1px solid white;
          color: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }
        .banner--fadeBottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 15rem;
          background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
          z-index: 5;
        }

        @media (max-width: 768px) {
          .banner__contents { margin-left: 20px; }
          .banner__title { font-size: 2.5rem; }
          .banner__description { font-size: 0.9rem; width: 100%; }
        }
      `}} />
    </header>
  );
};

export default Banner;

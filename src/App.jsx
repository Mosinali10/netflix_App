import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Row from './components/Row';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import MovieModal from './components/MovieModal';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';
import { useFavorites } from './hooks/useFavorites';
import './index.css';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=99`,
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { user } = useAuth();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (searchTerm) {
      const fetchSearch = async () => {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`);
        const data = await response.json();
        setMovies(data.results || []);
        setLoading(false);
      };
      fetchSearch();
    }
  }, [searchTerm]);

  const MainApp = () => (
    <div className="app">
      <Nav setSearchTerm={setSearchTerm} />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}

      {!searchTerm && !showFavorites ? (
        <>
          <Banner onMoreInfo={setSelectedMovie} />
          <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
        </>
      ) : (
        <div className="search-results">
          <div style={{ marginTop: '100px', padding: '0 20px' }}>
            <SearchBar setSearchTerm={setSearchTerm} />
            <h2 style={{ color: 'white', marginTop: '20px' }}>
              {showFavorites ? 'Your Favorites' : `Search Results for "${searchTerm}"`}
            </h2>
            <MovieList movies={showFavorites ? favorites : movies} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onShowDetails={setSelectedMovie} />
            <button className="back-btn" onClick={() => { setSearchTerm(''); setShowFavorites(false); }}>Back to Home</button>
          </div>
        </div>
      )}

      <div className="favorites-float" onClick={() => setShowFavorites(true)}>
        Favorites ({favorites.length})
      </div>
      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        .app { background-color: #111; min-height: 100vh; }
        .back-btn { background: #e50914; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 20px; font-weight: 700; }
        .favorites-float { position: fixed; bottom: 20px; right: 20px; background: #e50914; color: white; padding: 10px 20px; border-radius: 30px; cursor: pointer; font-weight: 700; z-index: 100; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        .loading-screen { background: black; color: #e50914; height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; }
      `}} />
    </div>
  );

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route path="/" element={
        <ProtectedRoute>
          <MainApp />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;

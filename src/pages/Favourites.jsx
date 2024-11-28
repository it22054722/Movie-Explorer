import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdb'; // Importing the TMDb API function

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false); // Retrieve dark mode state

  // Fetch favorites from localStorage on initial load
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    setLoading(false);
  }, []);

  // Remove movie from favorites
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Add a function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Store dark mode state
      return newMode;
    });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#282828', borderRadius: '10px' }}>
      <h1 style={{ color: 'white' }}>My Favorites</h1>
      {loading ? (
        <p style={{ color: 'white' }}>Loading your favorite movies...</p>
      ) : favorites.length === 0 ? (
        <p style={{ color: 'white' }}>You have no favorite movies yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {favorites.map((movie) => (
            <FavoriteMovieCard key={movie.id} movie={movie} removeFromFavorites={removeFromFavorites} />
          ))}
        </div>
      )}
    </div>
  );
};

// Component to display each favorite movie card
const FavoriteMovieCard = ({ movie, removeFromFavorites }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  // Fetch movie details when the component is mounted
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(movie.id); // Fetch details based on movie ID
      setMovieDetails(details);
    };
    fetchDetails();
  }, [movie.id]);

  // If movie details are not available, show a loading text
  if (!movieDetails) {
    return <div style={{ color: 'white' }}></div>;
  }

  return (
    <div style={{ margin: '10px', color: 'white',width:'450px'}}>
        
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
        style={{ width: '170px', borderRadius: '10px' }}
      />
      <h3>{movieDetails.title}</h3>
      <button
        onClick={() => removeFromFavorites(movieDetails.id)}
        style={{
          padding: '5px 10px',
          backgroundColor: '#E50914',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Remove
      </button>
      <Link to={`/movies/${movieDetails.id}`} style={{ color: '#1DB954', display: 'block', marginTop: '10px' }}>
        View Details
      </Link>
    </div>
  );
};

export default Favourites;

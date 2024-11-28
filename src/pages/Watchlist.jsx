import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Importing star icon
import { FaArrowLeft } from 'react-icons/fa'; // Import the back icon from react-icons

const Watchlist = () => {
  const navigate = useNavigate();
  const initialWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const [watchlist, setWatchlist] = useState(initialWatchlist); // State for watchlist
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false); // Retrieve dark mode state

  // Toggle favorite movie and remove from watchlist if unmarked
  const toggleFavorite = (movieId) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.filter(movie => movie.id !== movieId); // Remove movie from watchlist
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); // Update local storage
      return updatedWatchlist;
    });
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
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1c1c1c',
        width: '1400px',
        color: '#fff',
      }}
    >
      <button
  onClick={() => navigate('/')}
  style={{
    marginBottom: '20px',
    padding: '10px',
    cursor: 'pointer',
    color: '#9EA3C7',
    backgroundColor: 'transparent', // Set background color to transparent
    border: 'none', // Optional: Remove button border
    display: 'flex', // To align icon and text
    alignItems: 'center',
    gap: '8px', // Add some spacing between the icon and the text
  }}
>
  <FaArrowLeft /> Back
</button>

      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px', color: '#f39c12' }}>
        Your Watchlist
      </h1>

      <div
        className="movie-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          height:'520px',
          gap: '20px',
          marginTop: '40px',
        }}
      >
        {watchlist.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: '1.5rem', color: '#bdc3c7' }}>
            No movies in your watchlist yet.
          </p>
        ) : (
          watchlist.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                backgroundColor: '#2c3e50',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#34495e',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', margin: '0', color: '#ecf0f1' }}>
                  {movie.title}
                </h3>
                {/* Star Icon for Favorites */}
                <FaStar 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering movie click
                    toggleFavorite(movie.id);
                  }} 
                  style={{
                    color: 'gold',
                    cursor: 'pointer',
                    fontSize: '24px',
                    marginTop: '10px',
                  }} 
                />
              </div>
              {/* Overlay for extra aesthetics */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                  zIndex: '1',
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;

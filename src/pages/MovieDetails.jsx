import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdb';
import { FaArrowLeft, FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); // State to hold the favorite movies

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
      setLoading(false);
    };
    getMovieDetails();
  }, [movieId]);

  // Get favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Toggle favorite status of the movie
  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === movie.id)) {
      // If the movie is already in favorites, remove it
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      // If the movie is not in favorites, add it
      updatedFavorites = [...favorites, movie]; // Store the entire movie object
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Store updated favorites in localStorage
  };

  // Check if the movie is in the favorites list
  const isFavorite = favorites.some(fav => fav.id === movie?.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#282828', borderRadius: '10px', marginRight:'50px' }}>
      {/* Heart Icon for Adding to Favorites */}
      <button
        onClick={toggleFavorite}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'transparent',
          marginLeft:'1320px',
          marginTop:'5px',
          border: 'none',
          cursor: 'pointer',
          color: isFavorite ? 'red' : '#9EA3C7',
          fontSize: '30px',
        }}
      >
        <FaHeart />
      </button>

      {/* Back Button */}
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

      <h1>{movie.title}</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '300px', borderRadius: '10px', marginRight: '20px' }}
        />
        <div>
          <h2>Overview</h2>
          <p style={{ color: 'yellow' }}>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import Sun and Moon icons
import {
  fetchPopularMovies,
  fetchMoviesByGenre,
  fetchMoviesByTimePeriod,
  fetchMoviesByYear,
  fetchMoviesByLanguage,
  searchMovies,
} from '../services/tmdb';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('watchlist')) || []);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      let data = [];
      if (searchQuery) {
        data = await searchMovies(searchQuery);
      } else if (selectedGenre) {
        data = await fetchMoviesByGenre(selectedGenre);
      } else if (selectedTimePeriod) {
        data = await fetchMoviesByTimePeriod(selectedTimePeriod);
      } else if (selectedYear) {
        data = await fetchMoviesByYear(selectedYear);
      } else if (selectedLanguage) {
        data = await fetchMoviesByLanguage(selectedLanguage);
      } else {
        data = await fetchPopularMovies();
      }
      setMovies(data);
    };
    fetchFilteredMovies();
  }, [selectedGenre, selectedTimePeriod, selectedYear, selectedLanguage, searchQuery]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleDropdownChange = (type, value) => {
    switch (type) {
      case 'genre':
        setSelectedGenre(value);
        setSelectedTimePeriod('');
        setSelectedYear('');
        setSelectedLanguage('');
        break;
      case 'timePeriod':
        setSelectedTimePeriod(value);
        setSelectedGenre('');
        setSelectedYear('');
        setSelectedLanguage('');
        break;
      case 'year':
        setSelectedYear(value);
        setSelectedGenre('');
        setSelectedTimePeriod('');
        setSelectedLanguage('');
        break;
      case 'language':
        setSelectedLanguage(value);
        setSelectedGenre('');
        setSelectedTimePeriod('');
        setSelectedYear('');
        break;
      default:
        break;
    }
  };

  const toggleWatchlist = (movie) => {
    let updatedWatchlist;
    if (watchlist.some((item) => item.id === movie.id)) {
      updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    } else {
      updatedWatchlist = [...watchlist, movie];
    }
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const isInWatchlist = (movieId) => watchlist.some((movie) => movie.id === movieId);

  // Styles for dark mode
  const darkModeStyles = {
    backgroundColor: darkMode ? '#1c1c1c' : '#f9f9f9',
    color: darkMode ? '#f1f1f1' : '#333',
    transition: 'background-color 0.3s, color 0.3s',
    minHeight: '100vh',
    padding: '5px',
  };

  return (
    <div style={darkModeStyles}>
      {/* Switch Icon for Dark/Light Mode */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'transparent',
            border: 'none',
            marginLeft:'1320px',
            cursor: 'pointer',
            height:'35px',
            width:'50px',
            fontSize: '1rem',
            color: darkMode ? '#f1f1f1' : '#444',
          }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <h1 style={{ textAlign: 'center', color: darkMode ? '#f1f1f1' : '#444' }}>Popular Movies</h1>

      {/* Navigation Bar */}
      <div
        style={{
          backgroundColor: darkMode ? '#34495e' : '#2c3e50',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <select
            onChange={(e) => handleDropdownChange('genre', e.target.value)}
            value={selectedGenre}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: darkMode ? '#2c3e50' : '#34495e',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              flex: '1',
            }}
          >
            <option value="">Select Genre</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="14">Fantasy</option>
            <option value="27">Horror</option>
            <option value="10749">Romance</option>
            <option value="53">Thriller</option>
            <option value="16">Animation</option>
            <option value="99">Documentary</option>
            <option value="10751">Family</option>
            <option value="9648">Mystery</option>
            <option value="80">Crime</option>
            <option value="36">Historical</option>
            <option value="18">Biography</option>
          </select>
           
                     {/* Time Period Dropdown */}
          <select
            onChange={(e) => handleDropdownChange('timePeriod', e.target.value)}
            value={selectedTimePeriod}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#34495e',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              flex: '1',
            }}
          >
            <option value="">Select Time Period</option>
            <option value="new_releases">New Releases</option>
            <option value="upcoming">Upcoming Movies</option>
            <option value="classics">Classics</option>
            <option value="this_year">Movies Released This Year</option>
            <option value="90s">90s Movies</option>
            <option value="80s">80s Movies</option>
          </select>

          {/* Year Dropdown */}
          <select
            onChange={(e) => handleDropdownChange('year', e.target.value)}
            value={selectedYear}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#34495e',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              flex: '1',
            }}
          >
            <option value="">Select Year</option>
            {Array.from(
              { length: new Date().getFullYear() - 1999 },
              (_, i) => (
                <option key={i} value={2000 + i}>
                  {2000 + i}
                </option>
              )
            )}
          </select>

          {/* Language Dropdown */}
          <select
            onChange={(e) => handleDropdownChange('language', e.target.value)}
            value={selectedLanguage}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#34495e',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              flex: '1',
            }}
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="hi">Hindi</option>
            <option value="si">Sinhala</option>
          </select>

         {/* Search Bar */}
<input
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ecf0f1',
    flex: '2',
    fontSize: '16px',
    fontWeight:'bold',
    color: '#555', // Dark grey text color
  }}
/>
          <button
            onClick={() => navigate('/Favourites')}
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              flex: '1',
            }}
          >
            Favourites
          </button>

          {/* Watchlist Navigation Button */}
          <button
            onClick={() => navigate('/Watchlist')}
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              flex: '1',
            }}
          >
            Watchlist
          </button>
          
        </div>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            style={{
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handleMovieClick(movie.id)}
              style={{ width: '100%', height: 'auto' }}
            />
            <h3 style={{ textAlign: 'center', margin: '10px 0' }}>{movie.title}</h3>
            <span
              onClick={() => toggleWatchlist(movie)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                marginRight:'10px',
                marginTop:'5px',
                fontSize: '20px',
                color: isInWatchlist(movie.id) ? 'gold' : 'white',
              }}
            >
              &#9733;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

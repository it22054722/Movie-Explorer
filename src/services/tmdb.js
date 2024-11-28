import axios from 'axios';

// Base TMDb API URL
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Access your API key from the .env file

// Fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results; // Return the list of movies
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    return response.data.results; // Return the list of movies for the selected genre
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};

// Search movies by a query
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.data.results; // Return the search results
  } catch (error) {
    console.error('Error searching for movies:', error);
    return [];
  }
};

// Fetch movies by time period
export const fetchMoviesByTimePeriod = async (timePeriod) => {
  let endpoint = '';
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Access your API key from the .env file

  switch (timePeriod) {
    case 'new_releases':
      endpoint = `${API_URL}/movie/now_playing?api_key=${API_KEY}`;
      break;
    case 'upcoming':
      endpoint = `${API_URL}/movie/upcoming?api_key=${API_KEY}`;
      break;
    case 'classics':
      endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.lte=1989-12-31`;
      break;
    case 'this_year':
      const currentYear = new Date().getFullYear();
      endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${currentYear}`;
      break;
    case '90s':
      endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31`;
      break;
    case '80s':
      endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31`;
      break;
    default:
      return [];
  }

  try {
    const response = await axios.get(endpoint);
    return response.data.results; // Return the list of movies for the selected time period
  } catch (error) {
    console.error('Error fetching movies by time period:', error);
    return [];
  }
};

// Fetch movies by year
export const fetchMoviesByYear = async (year) => {
  try {
    const response = await axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`);
    return response.data.results; // Return the list of movies for the selected year
  } catch (error) {
    console.error('Error fetching movies by year:', error);
    return [];
  }
};

// Fetch movies by language
export const fetchMoviesByLanguage = async (language) => {
  try {
    const response = await axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${language}`);
    return response.data.results; // Return the list of movies for the selected language
  } catch (error) {
    console.error('Error fetching movies by language:', error);
    return [];
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.data; // Return the movie details
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Favourites from './pages/Favourites';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/Watchlist" element={<Watchlist/>} />
        <Route path="/Favourites" element={<Favourites/>} />
      </Routes>
    </Router>
  );
};

export default App;

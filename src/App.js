import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/styles.css';

const API_KEY = '6aa343e2';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=thor`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        setMovies(data.Search);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.Response === 'True') {
        setMovies(data.Search);
        setErrorMsg('');
      } else {
        setMovies([]);
        setErrorMsg('No results found. Please try again.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>React Movie App</h1>
      <form onSubmit={searchMovies}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a movie..." />
        <button type="submit">Search</button>
      </form>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <div className="movie-container">
        {movies.map((movie, index) => (
          <div className="movie" key={index}>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

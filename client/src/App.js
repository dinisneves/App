import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState('characters');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('/api/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Erro ao buscar os personagens:', error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
      }
    };

    const fetchQuotes = async () => {
      try {
        const response = await axios.get('/api/quotes');
        setQuotes(response.data);
      } catch (error) {
        console.error('Erro ao buscar as citações:', error);
      }
    };

    fetchCharacters();
    fetchMovies();
    fetchQuotes();
  }, []);

  const getMovieName = (quote) => {
    const movie = movies.find((m) => m._id === quote.movie);
    return movie ? movie.name : '';
  };

  return (
      <div className="app">
        <h1>O Senhor dos Anéis</h1>
        <div className="tabs">
          <div
              className={`tab ${activeTab === 'characters' ? 'active' : ''}`}
              onClick={() => setActiveTab('characters')}
          >
            Personagens
          </div>
          <div
              className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveTab('movies')}
          >
            Filmes
          </div>
          <div
              className={`tab ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes')}
          >
            Citações
          </div>
        </div>
        <div className="content">
          {activeTab === 'characters' && (
              <ul>
                {characters.map((character) => (
                    <li key={character._id}>
                      {character.name} - {character.race}
                    </li>
                ))}
              </ul>
          )}
          {activeTab === 'movies' && (
              <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>
                      {movie.title}
                    </li>
                ))}
              </ul>
          )}
          {activeTab === 'quotes' && (
              <ul>
                {quotes.map((quote) => (
                    <li key={quote._id}>
                      {quote.dialog} - {getMovieName(quote)}
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
}

export default App;
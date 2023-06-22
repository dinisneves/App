import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const [updateFormData, setUpdateFormData] = useState({
    movieId: '',
    newTitle: '',
  });

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Erro ao buscar os filmes:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateMovie = async () => {
    try {
      const { title } = formData;

      await axios.post('/api/movies', {
        name: title,
      });

      setFormData({
        title: '',
      });

      fetchMovies();
    } catch (error) {
      console.error('Erro ao criar o filme:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`/api/movies/${movieId}`);
      fetchMovies();
    } catch (error) {
      console.error('Erro ao excluir o filme:', error);
    }
  };

  const handleUpdateTitle = async () => {
    try {
      const { movieId, newTitle } = updateFormData;
      await axios.put(`/api/movies/${movieId}`, { name: newTitle });
      setUpdateFormData({ movieId: '', newTitle: '' });
      fetchMovies();
    } catch (error) {
      console.error('Erro ao atualizar o título do filme:', error);
    }
  };

  const [characters, setCharacters] = useState([]);
  const [characterFormData, setCharacterFormData] = useState({
    name: '',
    newCharacterName: '',
  });

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('/api/characters');
      setCharacters(response.data);
    } catch (error) {
      console.error('Erro ao buscar os personagens:', error);
    }
  };

  const handleCharacterInputChange = (e) => {
    setCharacterFormData({ ...characterFormData, [e.target.name]: e.target.value });
  };

  const handleCreateCharacter = async () => {
    try {
      const { name } = characterFormData;

      await axios.post('/api/characters', {
        name,
      });

      setCharacterFormData({
        name: '',
        newCharacterName: '',
      });

      fetchCharacters();
    } catch (error) {
      console.error('Erro ao criar o personagem:', error);
    }
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      await axios.delete(`/api/characters/${characterId}`);
      fetchCharacters();
    } catch (error) {
      console.error('Erro ao excluir o personagem:', error);
    }
  };

  const handleUpdateCharacterName = async (characterId) => {
    try {
      const { newCharacterName } = characterFormData;
      await axios.put(`/api/characters/${characterId}`, { name: newCharacterName });
      setCharacterFormData({ ...characterFormData, newCharacterName: '' });
      fetchCharacters();
    } catch (error) {
      console.error('Erro ao atualizar o nome do personagem:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);


  const [quotes, setQuotes] = useState([]);
  const [quoteFormData, setQuoteFormData] = useState({
    dialog: '',
    newDialog: '', // Adicionado estado para o novo diálogo
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('/api/quotes');
      setQuotes(response.data);
    } catch (error) {
      console.error('Erro ao buscar as citações:', error);
    }
  };

  const handleQuoteInputChange = (e) => {
    setQuoteFormData({ ...quoteFormData, [e.target.name]: e.target.value });
  };

  const handleCreateQuote = async () => {
    try {
      const { dialog } = quoteFormData;

      await axios.post('/api/quotes', {
        dialog,
      });

      setQuoteFormData({
        dialog: '',
      });

      fetchQuotes();
    } catch (error) {
      console.error('Erro ao criar a citação:', error);
    }
  };

  const handleDeleteQuote = async (quoteId) => {
    try {
      await axios.delete(`/api/quotes/${quoteId}`);
      fetchQuotes();
    } catch (error) {
      console.error('Erro ao excluir a citação:', error);
    }
  };

  const handleUpdateDialog = async (quoteId) => {
    try {
      const { newDialog } = quoteFormData;
      await axios.put(`/api/quotes/${quoteId}`, { dialog: newDialog });
      setQuoteFormData({ ...quoteFormData, newDialog: '' });
      fetchQuotes();
    } catch (error) {
      console.error('Erro ao atualizar o diálogo da citação:', error);
    }
  };

  const [activeTab, setActiveTab] = useState('movies');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
      <div className="app">
        <h1>Senhor dos Anéis</h1>
        <div className="tabs">
          <button
              className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => handleTabChange('movies')}
          >
            Filmes
          </button>
          <button
              className={`tab ${activeTab === 'characters' ? 'active' : ''}`}
              onClick={() => handleTabChange('characters')}
          >
            Personagens
          </button>
          <button
              className={`tab ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => handleTabChange('quotes')}
          >
            Citações
          </button>
        </div>
        <div className="content">
          {activeTab === 'movies' && (
              <>
                <div className="movies-list">
                  <h2>Lista de Filmes</h2>
                  <ul>
                    {movies.map((movie) => (
                        <li key={movie._id}>
                          <div className="movie-info">
                            <span className="movie-id">ID: {movie._id}</span>
                            <span className="movie-title">{movie.name}</span>
                          </div>
                          <button className="delete-button" onClick={() => handleDeleteMovie(movie._id)}>
                            Excluir
                          </button>
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="create-movie">
                  <h2>Criar Filme</h2>
                  <input
                      type="text"
                      name="title"
                      placeholder="Título"
                      value={formData.title}
                      onChange={handleInputChange}
                  />
                  <button className="create-button" onClick={handleCreateMovie}>
                    Criar Filme
                  </button>
                </div>
                <div className="create-movie">
                  <h2>Editar Filme</h2>
                  <input
                      type="text"
                      name="movieId"
                      placeholder="ID do Filme"
                      value={updateFormData.movieId}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, movieId: e.target.value })}
                  />
                  <input
                      type="text"
                      name="newTitle"
                      placeholder="Novo Título"
                      value={updateFormData.newTitle}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, newTitle: e.target.value })}
                  />
                  <button className="create-button" onClick={handleUpdateTitle}>
                    Editar Filme
                  </button>
                </div>
              </>
          )}

          {activeTab === 'characters' && (
              <>
                <div className="movies-list">
                  <h2>Lista de Personagens</h2>
                  <ul>
                    {characters.map((character) => (
                        <li key={character._id}>
                          <div className="character-info">
                            <span className="movie-id">ID: {character._id}</span>
                            <span className="movie-name">{character.name}</span>
                          </div>
                          <button
                              className="delete-button"
                              onClick={() => handleDeleteCharacter(character._id)}
                          >
                            Excluir
                          </button>
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="create-movie">
                  <h2>Criar Personagem</h2>
                  <input
                      type="text"
                      name="name"
                      placeholder="Nome"
                      value={characterFormData.name}
                      onChange={handleCharacterInputChange}
                  />
                  <button className="create-button" onClick={handleCreateCharacter}>
                    Criar Personagem
                  </button>
                </div>
                <div className="create-movie">
                  <h2>Editar Personagem</h2>
                  <input
                      type="text"
                      name="characterId"
                      placeholder="ID do Personagem"
                      value={characterFormData.characterId}
                      onChange={handleCharacterInputChange}
                  />
                  <input
                      type="text"
                      name="newCharacterName"
                      placeholder="Novo Nome"
                      value={characterFormData.newCharacterName || ''}
                      onChange={handleCharacterInputChange}
                  />
                  <button
                      className="create-button"
                      onClick={() => handleUpdateCharacterName(characterFormData.characterId)}
                  >
                    Editar Personagem
                  </button>
                </div>
              </>
          )}
          {activeTab === 'quotes' && (
              <>
                <div className="movies-list">
                  <h2>Lista de Citações</h2>
                  <ul>
                    {quotes.map((quote) => (
                        <li key={quote._id}>
                          <div className="movie-info">
                            <span className="movie-id">ID: {quote._id}</span>
                            <span className="movie-title">{quote.dialog}</span>
                          </div>
                          <button className="delete-button" onClick={() => handleDeleteQuote(quote._id)}>
                            Excluir
                          </button>
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="create-quote">
                  <h2>Criar Citação</h2>
                  <input
                      type="text"
                      name="dialog"
                      placeholder="Diálogo"
                      value={quoteFormData.dialog}
                      onChange={handleQuoteInputChange}
                  />
                  <button className="create-button" onClick={handleCreateQuote}>
                    Criar Citação
                  </button>
                </div>
                <div className="create-quote">
                  <h2>Editar Citação</h2>
                  <input
                      type="text"
                      name="quoteId" // Alterado para "quoteId"
                      placeholder="ID da Citação"
                      value={quoteFormData.quoteId}
                      onChange={handleQuoteInputChange}
                  />
                  <input
                      type="text"
                      name="newDialog"
                      placeholder="Novo Diálogo"
                      value={quoteFormData.newDialog || ''}
                      onChange={handleQuoteInputChange}
                  />
                  <button className="create-button" onClick={() => handleUpdateDialog(quoteFormData.quoteId)}>
                    Editar Citação
                  </button>
                </div>

              </>
          )}
        </div>
      </div>
  );
}

export default App;

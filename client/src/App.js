import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    runtimeMinutes: '',
    budget: '',
    boxOffice: '',
    awardNominations: '',
    awardWins: '',
    rtScore: '',
    genre: ''
  });


  useEffect(() => {
    fetchMovies();
  }, []);

  const [updateFormData, setUpdateFormData] = useState({
    movieId: '',
    newTitle: ''
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
      const { title, runtimeMinutes, budget, boxOffice, awardNominations, awardWins, rtScore, genre } = formData;

      await axios.post('/api/movies', {
        title,
        runtimeMinutes,
        budget,
        boxOffice,
        awardNominations,
        awardWins,
        rtScore,
        genre
      });

      setFormData({
        title: '',
        runtimeMinutes: '',
        budget: '',
        boxOffice: '',
        awardNominations: '',
        awardWins: '',
        rtScore: '',
        genre: ''
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
      await axios.put(`/api/movies/${movieId}`, { title: newTitle });
      setUpdateFormData({ movieId: '', newTitle: '' });
      fetchMovies();
    } catch (error) {
      console.error('Erro ao atualizar o título do filme:', error);
    }
  };
  return (
      <div className="app">
        <h1>Senhor dos Aneis</h1>
        <div className="content">
          <div className="movies-list">
            <h2>Lista de Filmes</h2>
            <ul>
              {movies.map((movie) => (
                  <li key={movie.movieId}>
                    <div className="movie-info">
                      <span className="movie-id">ID: {movie.movieid}</span>
                      <span className="movie-title">{movie.title}</span>
                    </div>
                    <button className="delete-button" onClick={() => handleDeleteMovie(movie.movieid)}>
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
        </div>
      </div>
  );
}

export default App;

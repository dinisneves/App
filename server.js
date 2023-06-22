const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;
const { v4: uuidv4 } = require('uuid');

// Configuração do banco de dados
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'tpdb',
    user: 'postgres',
    password: '123'
});

// Middlewares
app.use(express.static('client/build'));
app.use(bodyParser.json());

// Rotas
app.get('/api/movies', (req, res) => {
    pool.query('SELECT * FROM movies', (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(result.rows);
        }
    });
});

app.post('/api/movies', (req, res) => {
    const { title } = req.body;
    const movieid = uuidv4(); // Gera um ID único usando o pacote uuid

    pool.query(
        'INSERT INTO movies (title, movieid) VALUES ($1, $2)',
        [title, movieid],
        (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Filme criado com sucesso' });
            }
        }
    );
});

app.put('/api/movies/:movieId', (req, res) => {
    const { movieId } = req.params;
    const { title } = req.body;

    pool.query(
        'UPDATE movies SET title = $1 WHERE movieid = $2',
        [title, movieId],
        (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Filme atualizado com sucesso' });
            }
        }
    );
});


app.delete('/api/movies/:movieId', (req, res) => {
    const { movieId } = req.params;

    pool.query('DELETE FROM movies WHERE movieid = $1', [movieId], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json({ message: `Filme com ID ${movieId} excluído com sucesso` });
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
 
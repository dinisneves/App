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
app.use(bodyParser.json());

// Rotas API
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
    const { name } = req.body;
    const movieId = uuidv4(); // Gera um ID único usando o pacote uuid

    pool.query(
        'INSERT INTO movies (_id, name) VALUES ($1, $2)',
        [movieId, name],
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

app.put('/api/movies/:_id', (req, res) => {
    const { _id } = req.params;
    const { name } = req.body;

    pool.query(
        'UPDATE movies SET name = $1 WHERE _id = $2',
        [name, _id],
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


app.delete('/api/movies/:_id', (req, res) => {
    const { _id } = req.params;

    pool.query('DELETE FROM movies WHERE _id = $1', [_id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json({ message: `Filme com ID ${_id} excluído com sucesso` });
        }
    });
});

// Rotas para personagens
app.get('/api/characters', (req, res) => {
    pool.query('SELECT * FROM characters', (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(result.rows);
        }
    });
});

app.post('/api/characters', (req, res) => {
    const { name } = req.body;
    const characterId = uuidv4(); // Gera um ID único usando o pacote uuid

    pool.query(
        'INSERT INTO characters (_id, name) VALUES ($1, $2)',
        [characterId, name],
        (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Personagem criado com sucesso' });
            }
        }
    );
});

app.put('/api/characters/:_id', (req, res) => {
    const { _id } = req.params;
    const { name } = req.body;

    pool.query(
        'UPDATE characters SET name = $1 WHERE _id = $2',
        [name, _id],
        (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Personagem atualizado com sucesso' });
            }
        }
    );
});

app.delete('/api/characters/:_id', (req, res) => {
    const { _id } = req.params;

    pool.query('DELETE FROM characters WHERE _id = $1', [_id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json({ message: `Personagem com ID ${_id} excluído com sucesso` });
        }
    });
});

// Rotas para quotes
app.get('/api/quotes', (req, res) => {
    pool.query('SELECT * FROM quotes', (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(result.rows);
        }
    });
});

app.post('/api/quotes', (req, res) => {
    const { dialog } = req.body;
    const quoteId = uuidv4(); // Gera um ID único usando o pacote uuid

    pool.query(
        'INSERT INTO quotes (_id, dialog) VALUES ($1, $2)',
        [quoteId, dialog],
        (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Citação criada com sucesso' });
            }
        }
    );
});



app.put('/api/quotes/:_id', (req, res) => {
    const { _id } = req.params;
    const { dialog } = req.body;

    pool.query(
        'UPDATE quotes SET dialog = $1 WHERE _id = $2',
        [dialog, _id],
        (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                res.json({ message: 'Citação atualizada com sucesso' });
            }
        }
    );
});

app.delete('/api/quotes/:_id', (req, res) => {
    const { _id } = req.params;

    pool.query('DELETE FROM quotes WHERE _id = $1', [_id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json({ message: `Citação com ID ${_id} excluído com sucesso` });
        }
    });
});

// Servir o aplicativo React
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});

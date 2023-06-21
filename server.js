const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3001;

const {Pool} = require('pg');

const pool = new Pool({
    host: "172.17.0.1",
    port: 5432,
    database: "tpdb",
    user: "postgres",
    password: "123"
});


app.use(express.static('client/build'));


app.get('/api/characters', (req, res) => {
    try {
        pool.query('SELECT * FROM characters', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({error: 'An error occurred'});
            } else {
                res.json(result.rows);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar os personagens:', error);
        res.status(500).json({error: 'Erro ao buscar os personagens.'});
    }
});


app.get('/api/movies', (req, res) => {
    try {
        pool.query('SELECT * FROM movies', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({error: 'An error occurred'});
            } else {
                res.json(result.rows);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
        res.status(500).json({error: 'Erro ao buscar os filmes.'});
    }
});


app.get('/api/quotes', (req, res) => {
    try {
        pool.query('SELECT * FROM quotes', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).json({error: 'An error occurred'});
            } else {
                res.json(result.rows);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar as citações:', error);
        res.status(500).json({error: 'Erro ao buscar as citações.'});
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
const express = require('express');
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wallpaper_product'
});

dbConnection.connect();

const app = express();


// categories
app.get('/categories', (req, res) => {
    dbConnection.query('SELECT * from categories', (error, results, fields) => {
        if(error) throw  error;

        res.status(200).json({
            success: true,
            data: results
        });
    });
});

// photos of a category
app.get('/categories/:id/photos', (req, res) => {
    dbConnection.query('SELECT * from photos WHERE category_id = ?', [req.params.id], (error, results, query) => {
        if(error) throw error;

        res.status(200).json({
            success: true,
            data: results
        })
    });
});

app.listen(process.env.PORT || 5000);
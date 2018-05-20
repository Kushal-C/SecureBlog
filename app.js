const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if (err) {
        console.log("Error connecting to DB");
    }
    console.log('MySql Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) console.log("Error creating Database");
        console.log(result);
        res.send('Database created...');
    });
});

//Use EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Listen
app.listen(3000, () => {
    console.log('Server listening on 3000');
});
// Setup
const express = require('express');
const mysql = require('mysql');

const app = express();

//Use EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup Routes
app.get("/", (req, res) => {
    res.render('login_form');
});

// Listen
app.listen(3000, () => {
    console.log('Server listening on 3000');
})
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

// Connect
db.connect((err) => {
    if (err) {
        console.log("Error connecting to DB " + err);
    }
    console.log('MySql Connected...');
});

//Get Homepage
router.get('/', function (req, res) {
    
    //Insert SQL QUERY
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render('index',{post :result});
    });

});

module.exports = router;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

// Create connection
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

function UserSchema(user, pass, mail) {
    this.username = user;
    this.password = pass;
    this.email = mail;
    this.access = "User";
};

/*
db.query('CREATE TABLE users(email VARCHAR(255), username VARCHAR(255), password VARCHAR(255), access VARCHAR(255), PRIMARY KEY (email));', function (err) {
    if (err) throw err;
    console.log('Users TABLE created.');
});

db.query('CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), creatoremail VARCHAR(255), PRIMARY KEY (id));', function (err) {
    if (err) throw err;
    console.log('Posts TABLE created.');
});
*/


module.exports.createUser = function(newUser , callback) {
    console.log("Is Null? : " + newUser.password);

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) console.log("Failed in create user hash (inner) " + err);
            newUser.password = hash;
            let createUser = {username:newUser.username, email:newUser.email, password: newUser.password, access:'User'};
            let sql = 'INSERT INTO users SET ?';
            let query = db.query(sql, createUser, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            
            });

            callback(newUser);
        });
        if (err) console.log("Failed in create user hash (outer)" + err);
    });

    
}

module.exports.getUserByUsername = function (username, callback) {
    let temp = "\'" + username + "\'";
    let sql = `SELECT * FROM users WHERE username =` + temp;
    let query = db.query(sql, (err, results) => {
        if (err) console.log(err); 
        callback(null,results);
    });
}

module.exports.getUserByEmail = function (email, callback) {
    let sql = 'SELECT ' + email + ' FROM users';
    let query = db.query(sql, (err, result) => {
        if (err) console.log(err);
        callback(null,result);
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) console.log(err);
        callback(null, isMatch);
    });
}
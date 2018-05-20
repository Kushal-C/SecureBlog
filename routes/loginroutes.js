var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

// Handler for User Registration
exports.register = function (req, res) {
    // console.log("req",req.body);
    var today = new Date();
    var users = {
        "username": req.body.username,
        "password": req.body.password,
        "access": req.body.access
    }

    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });
}

exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if ([0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Username and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Username does not exits"
                });
            }
        }
    });
}
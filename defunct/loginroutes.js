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
        console.log("Database is connected ...");
    } else {
        console.log("Error connecting database ...");
    }
});

// Handler for User Registration
exports.register = function (req, res) {
    // console.log("req",req.body);
    res.sendFile(__dirname + '/views/register_form.html');

    var users = {
        "username": req.body.username,
        "password": req.body.password,
        "access": user
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
            res.sendFile(__dirname + '/views/login_form.html');
        }
    });
}

exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.sendFile(__dirname + '/views/login_form.html');
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
                    results.redirect('/blog_list');
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Username and password does not match"
                    });
                    Console.log("Check your username and password to see if they are correct");
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Username does not exist"
                });
                Console.log("User does not exist");
            }
        }
    });
}
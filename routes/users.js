var express = require('express');
var router = express.Router();
const app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

var User = require('../models/user');
// User Schema
function UserSchema(user, pass, mail) {
    this.username = user;
    this.password = pass;
    this.email = mail;
    this.access = "User";
};

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

//Register Route
router.get('/register',function (req,res){
    res.render('register');
});

router.get('/add', function (req,res){
    res.render('/');
});

//Login Route
router.get('/login', function (req, res) {
    res.render('login');
});

//Register User
router.post('/register', function (req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    // Validation
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors)
    {
        res.render('register', {
            errors:errors
        });
    }
    else {
        let newUser = new UserSchema(username, password, email);
        //console.log("New user object password : " + newUser.password);
        User.createUser(newUser, function(err, user){
            if(err) console.log("Error :" + err);
            console.log(user);
        });

        req.flash('success_msg', "You are registered and can now log in");
        res.redirect('/users/login')
    }
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }
            console.log(user[0].password);
            User.comparePassword(password, user[0].password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));
/*
let temp = "\'" + username + "\'";
let sql = `SELECT * FROM users WHERE username =` + temp;
let query = db.query(sql, (err, results) => {
    if (err) console.log(err);
    return results;
}); */

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function (req, res) {
        console.log("Got Here");
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

router.post('/add', function (req, res) {
    console.log("I got here");
    var test = req.body;
    res.send("TEST");
});

module.exports = router;
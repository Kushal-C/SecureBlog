var express = require('express');
var router = express.Router();
const app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
// User Schema
function UserSchema(user, pass, mail) {
    this.username = user;
    this.password = pass;
    this.email = mail;
    this.access = "User";
};

//Register Route
router.get('/register',function (req,res){
    res.render('register');
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
    function(username, password, done) {
        User.getUserByUsername(username, function(err,user){
            if(err) console.log(err);
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) console.log(err);
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
    });

module.exports = router;
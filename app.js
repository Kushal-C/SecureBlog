// Setup
var express = require('express');
var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res) => {
    res.render('login_form');
});

// Listen
app.listen(3000, () => {
    //console.log('Server listing on ' + port);
})

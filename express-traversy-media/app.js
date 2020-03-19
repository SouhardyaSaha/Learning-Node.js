const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database);
let db = mongoose.connection;

//check connection
db.once('open', function () {
    console.log('connected to database');
});

//check for database error
db.on('error', function (err) {
    console.log(err);
});

// app init
const app = express();

// Bring Models
let Article = require('./models/article');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

// Express message middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Passport config
require('./config/passport')(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {  

    res.locals.user = req.user || null;
    next();

});

// Home Route
app.get('/', (req, res) => {

    Article.find({}, (err, articles) => {

        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles,
            });
        }

    });

});

// Routing Files
let articles = require('./routes/article');
let users = require('./routes/users');

app.use('/article', articles);
app.use('/users', users);

// set server
const port = process.env.port || 3000;
app.listen(3000, () => {

    console.log(`server running in ${port}`);

});
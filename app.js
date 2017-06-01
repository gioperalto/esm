'use strict'
// app.js

// ---------------------------------------------------------
// Setup
// ---------------------------------------------------------

// Declare variables
let express      = require('express'),
    app          = express(),
    mongoose     = require('mongoose'),
    passport     = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),
    configDB     = require('./config/database'),
    seed         = require('./seed'),
    auth         = require('./app/utils/auth'),
    port         = process.env.PORT || 1337;

// Allow Express to serve static files in "public" directory
app.use(express.static('public'));

// Read cookies (needed for auth)
app.use(cookieParser());

// For handling form data
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// Views + Templating
app.set('views', './views');
app.set('view engine', 'pug');

// Required for passport
require('./config/passport')(passport);
app.use(session({ 
  secret: 'strongwiththeforcethisoneis',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ---------------------------------------------------------
// Database configurations
// ---------------------------------------------------------
mongoose.Promise = require('bluebird');
mongoose.connect(configDB.url);
seed.seedDB();

// ---------------------------------------------------------
// Route configurations
// ---------------------------------------------------------
let routes = {
  admin: [
    'grow',
    'hire',
    'transactions',
    'users'
  ],
  api: [
    'battles',
    'champions',
    'moods',
    'players',
    'rosters',
    'seasons'
  ],
  public: [
    'players',
    'roster',
    'users'
  ]
};
for(let key in routes) {
  for(let route of routes[key]) {
    require('./config/routes/' + key + '/' + route)(
      app,
      passport,
      auth.isLoggedIn
    );
  }
}

// ---------------------------------------------------------
// Launch
// ---------------------------------------------------------

// Server launch (TODO: Implement try-catch)
app.listen(port);
console.log('Launched server at: http://localhost:' + port);

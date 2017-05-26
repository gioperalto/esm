// app.js

// ---------------------------------------------------------
// Setup
// ---------------------------------------------------------

// Declare variables
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB     = require('./config/database');
var seed         = require('./seed');
var port         = process.env.PORT || 1337;

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
// API Endpoints
// ---------------------------------------------------------
require('./config/api-endpoints')(app);

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
require('./config/routes')(app, passport);
require('./config/admin-routes')(app, passport);

// ---------------------------------------------------------
// Launch
// ---------------------------------------------------------

// Server launch (TODO: Implement try-catch)
app.listen(port);
console.log('Launched server at: http://localhost:' + port);

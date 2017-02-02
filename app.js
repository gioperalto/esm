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
var configDB     = require('./config/database.js');
var seed         = require('/.seed.js');
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
mongoose.connect(configDB.url);

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
require('./config/routes.js')(app);
require('./config/admin-routes.js')(app, passport);

// ---------------------------------------------------------
// Launch
// ---------------------------------------------------------

// Server launch (TODO: Implement try-catch)
app.listen(port);
console.log('Launched server at: http://localhost:' + port);

const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// import helpers
const helpers = require('./helpers');

// create conexion db
const db = require('./config/db');

// import model 
require('./models/Projects');
require('./models/Tasks');
require('./models/Users');

db.sync()
    .then(() => console.log('server db conect'))
    .catch(error => console.log(error));

// create app of express
const app = express();

// load files statics
app.use(express.static('public'));

// enable pug (template views)
app.set('view engine', 'pug');

// enable bodyParser
app.use(bodyParser.urlencoded({extended:true}));

// enable expressValidator
app.use(expressValidator());

// add folder views
app.set('views', path.join(__dirname, './views'));

// add flash messagers
app.use(flash());

// session permit navigater for diferent viws
app.use(session({
   secret: 'supersecret',
   resave: false,
   saveUninitialized: false 
}));

// use var dum for all app (middleware)
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.messages = req.flash();
    next();
})

app.use('/', routes());

app.listen(3001);
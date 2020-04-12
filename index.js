const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// import variables server
require('dotenv').config({ path: 'variables.env'});

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

// session permit navigater for diferent views
app.use(session({
   secret: 'supersecret',
   resave: false,
   saveUninitialized: false 
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// use var dum for all app (middleware)
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.messages = req.flash();
    res.locals.user = {...req.user} || null;
    next();
})

app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>{
    console.log(`----> Run Server Port: ${port}`);
});
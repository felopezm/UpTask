const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// import helpers
const helpers = require('./helpers');

// create conexion db
const db = require('./config/db');

// import model 
require('./models/Projects');
require('./models/Tasks');

db.sync()
    .then(() => console.log('server db conect'))
    .catch(error => console.log(error));

// create app of express
const app = express();

// load files statics
app.use(express.static('public'));

// enable pug (template views)
app.set('view engine', 'pug');

// add folder views
app.set('views', path.join(__dirname, './views'));

// use var dum for all app (middleware)
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

// enable bodyParser
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', routes());

app.listen(3001);
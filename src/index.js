const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session') (session);
const passport = require ('passport');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('connect-flash');


const { database } = require('./keys');


//Inisializar 

const app = express();
require('./lib/passport');


//Ajustes
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views' ));
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir : path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  helpers: require('./lib/handlebars')
}));


app.set('view engine', 'hbs');

//peticiones
app.use(session({
  secret: 'edumysqlnodesession',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());






//variables globales
app.use((req, res, next)=>{
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});




//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/tasks',require('./routes/links'));

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//Que empieze la pachanga
app.listen(app.get('port'), ()=>{
  console.log('Server en el puerto', app.get('port'));
});




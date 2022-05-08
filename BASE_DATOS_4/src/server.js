
var express = require("express");
var exphbs = require('express-handlebars');
const path = require('path');
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require('connect-flash');
const session = require('express-session');

// Inicializaciones
const app = express();

// Ajustes
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    //defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//app.set('view options', { layout: 'index' });

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    res.locals.mensaje_correcto = req.flash('mensaje_correcto');
    res.locals.mensaje_error = req.flash('mensaje_error');
    next();
});


// Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notas.routes'));
app.use(require('./routes/usuarios.routes'));

// Ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
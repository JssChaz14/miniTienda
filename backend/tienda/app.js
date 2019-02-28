var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// Routes import
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var inventoryRouter = require('./routes/inventory');
var salesRouter = require('./routes/sales');
var uploadRouter = require('./routes/upload');


var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connection
mongoose.connect('mongodb://localhost:27017/minitienda', { useNewUrlParser: true }).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('correcto')
    },
    err => {
        /** handle initial connection error */
        console.log('error bd');

    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/productos', productsRouter);
app.use('/inventario', inventoryRouter);
app.use('/ventas', salesRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
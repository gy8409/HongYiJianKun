var express = require('express');
var swig = require('swig');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');

var routes = require('./routes/routes');
var users = require('./routes/users');
var messages = require('./routes/messages');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session')

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view cache', false);

app.use(favicon());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'styles')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(session({ secret: "your secret here", resave: true, saveUninitialized: true }));
app.use(messages);

app.get('/', routes.getIndex);
app.get('/index', routes.getIndex);
app.get('/introduction', routes.getIntroduction);
app.get('/services', routes.getServices);
app.get('/career', routes.getCareer);
app.get('/career/form', routes.getCareerForm);
app.get('/contact', routes.getContact);
app.post('/signup', routes.signup);
app.post('/login', routes.login);
app.get('/checkUsername', routes.check);
console.log(">>>app.locals.settings: ");
console.dir(app.locals.settings);
console.log("<<<");

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log(req.url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

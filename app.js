'use strict';

// express config
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT||3000;  //设置端口3000（默认），和外围所传递的参数

// import routers
var indexRouter = require('./routers/IndexRouter');
var volumeRouter = require('./routers/VolumeRouter');

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Angular-BackEnd');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'unable to connect to mongodb'));
db.once('open', function() {
    console.log("port:3000,connect to mongodb success...");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/volume', volumeRouter);
app.listen(port);    //监听端口

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

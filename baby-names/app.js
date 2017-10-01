var express = require('express');
var path = require('path');


var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://martinpham@localhost:5432/baby_names');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

var Profile = sequelize.define('profile',{
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING,
	bio: Sequelize.TEXT,
});

var Asset = sequelize.define('asset',{
	location: Sequelize.STRING,
	type: Sequelize.STRING,
	notes: Sequelize.TEXT,
});

var Toy = sequelize.define('toy',{
	name: Sequelize.STRING,
	notes: Sequelize.TEXT,
});






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

app.listen(3002, function(){
  console.log('App is listening on port 3000');
});


module.exports = app;

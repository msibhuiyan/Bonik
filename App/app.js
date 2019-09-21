var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var SignupJS = require("./public/javascripts/signup.js");
var LoginJS =require ("./public/javascripts/login.js");
var ValidationJS =require ("./public/javascripts/validation.js");
var session = require('express-session');
var app = express()
app.set('trust proxy', 1)
app.use(session({
  secret: 'blockchainchatbot',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }})
);



const bodyParser = require('body-parser');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.all('/', function (req, res) {
  if(req.session.accno){
    res.redirect('userindex')
  }else{
    res.render('index');
  }

})
app.post('/signup',function(req, res){
  console.log('hit sign up');
  SignupJS.signupcheck(req, res);

})
app.post('/login', function(req, res){
  console.log('hit login');
  LoginJS.login(req, res);
})
/*app.post('/transaction', function(req, res){
  console.log('hit transaction');
  TransactionJS.transact(req, res);
})
/*app.post('/test', function(req, res){
  console.log('hit transaction');
  TestJS.validate(req, res);
})*/
app.post('/validation', function(req, res){
  var query= req.body.query;
  var sender = req.session.accno;
  callapi = {
    "query": query,
    "sender": sender,
  }

  ValidationJS.callAPI(callapi, res);
});
app.get('/userindex', function(req, res){
  console.log("hello/user index")
  if(req.session.accno) {
    res.render('./userindex');
	} else {
		res.redirect('/');
	}
})
app.get('/logout',function(req,res){
  console.log('hit logout');
  console.log(req.session.accno);
	// if the user logs out, destroy all of their individual sess1ion
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});

});


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

const express = require('express')
const app = express()
var fs = require('fs');
var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync( 'encryption/primary.crt' );
var ca = fs.readFileSync( 'encryption/intermediate.crt' );
var https = require('https');
var SignupJS = require("./public/js/signup.js");
var LoginJS =require ("./public/js/login.js");
//var CheckmoneyJS =require("./public/js/checkmoney.js");
//var TransactionJS =require ("./public/js/transaction.js");
//var TestJS = require("./public/js/test.js");
var ValidationJS =require ("./public/js/validation.js");
const bodyParser = require('body-parser');
var options = {
key: key,
cert: cert,
ca: ca
};
app.set('views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  console.log('working');
  res.render('index');
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
  console.log('hit validation');
  ValidationJS.callAPI(req, res);
});
app.get('/logout', function(req, res){
  res.redirect('/');
})
/*app.post('/checkmoney', function(req, res){
  console.log('hit check mon');
  CheckmoneyJS.check(req, res);
})
*/
https.createServer(options, app).listen(3000);
console.log('Server started!');

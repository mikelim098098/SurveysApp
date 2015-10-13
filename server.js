var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
// var mongoose = require('mongoose');
// var passport  = require('passport');

var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(session({
  secret: 'bestappever',
  resave: false,
  saveUnitialized: true
}));

require('./config/mongoose.js');
require('./config/routes.js')(app);

// app.use(passport.initialize());
// app.use(passport.session());

// var User = require('./server/model/model');
// passport.use(User.createStrategy());

app.listen(8888, function(){
  console.log('FULL MEAN ON 8888! BLACKBELT OPTIONF!')
});

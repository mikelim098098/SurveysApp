var customers = require('./../server/controllers/users.js');
var polls = require('./../server/controllers/polls.js');

module.exports = function(app){

  app.get('/', function (req, res) {
    res.redirect('index.html')
  })

  app.post('/login', function (req, res) {
  	customers.login(req,res);
  })

  app.get('/session', function (req, res) {
    res.json(req.session.user);
  })

  app.post('/session', function(req,res){
  	req.session.user = {};
  	res.end();
  })

  app.post('/poll', function(req,res){
  	req.body.name = req.session.user.name;
  	polls.create(req,res);
  })

  app.get('/polls', function(req,res){
  	polls.show(req,res);
  })

  app.post('/delete_poll', function(req,res){
  	polls.destroy(req,res);
  })

  app.post('/poll_info', function(req,res){
  	polls.showOne(req,res);
  })

  app.post('/voteUp', function(req,res){
  	polls.voteUp(req,res);
  })

}

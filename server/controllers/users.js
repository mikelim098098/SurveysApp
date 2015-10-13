var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
 return {
  login: function(req, res) {
     User.find({name: req.body.name}, function(err, results) {
       if(err) {
         console.log(err);
       } else if (results.length == 0) {
         var newUser = new User({name: req.body.name});
         newUser.save(function(err){
          if(err) {
              console.log('something went wrong with User Login');
            } else { // else console.log that we did well and then redirect to the root route
              console.log('successfully added User!');
              User.find({name:req.body.name}, function(err,results){
                req.session.user = results[0];
                res.json(results[0]);
              })
            }
          })
        }
        else{
          req.session.user = results[0];
          res.json(results[0]);
        } 
   })
  }
 }
})();

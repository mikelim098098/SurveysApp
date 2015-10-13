var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');

module.exports = (function() {
 return {
  create: function(req, res) {
    if(req.body.name != '' && req.body.question != '' && req.body.option1 != ''
      && req.body.option2 != '' && req.body.option3 != '' && req.body.option3 != ''
      && req.body.option4 != '' && req.body.name != undefined && req.body.question != undefined && req.body.option1 != undefined
      && req.body.option2 != undefined && req.body.option3 != undefined && req.body.option3 != undefined
      && req.body.option4 != undefined){
      var newPoll = new Poll(req.body);
      newPoll.save(function(err){
        if(err){
          console.log('error adding poll')
        }
        else{
          console.log('successfully added poll')
          res.json({error: true})
        }
      })
    }
    else{
      res.json({error:false})
    }
  },
  show: function(req,res){
    Poll.find({},function(err,results){
      if(err){
        console.log('err');
      }
      else{
        res.json(results);
      }
    })
  },
  destroy: function(req,res){
    Poll.remove({_id: req.body._id}, function(err,result){
      if(err){
        console.log('somehting went wrong deleting')
      }
      else{
        console.log('successfully deleted Poll')
      }
    })
    res.end()
  },
  showOne: function(req,res){
    Poll.find({_id: req.body.id}, function(err,results){
      if(err){
        console.log('finding error');
      }
      else{
        res.json(results[0]);
      }
    })
  },
  voteUp: function(req,res){
    if(req.body.option == 1 ){
      console.log('1');
      Poll.update({_id : req.body.poll}, {$inc: {votes1: 1}}, function(err,results){
        res.end();
      })
    }
    else if(req.body.option ==2){
      console.log('2');
      Poll.update({_id : req.body.poll}, {$inc: {votes2: 1}}, function(err,results){
        res.end();
      })
    }
    else if(req.body.option ==3){
      console.log('3');
      Poll.update({_id : req.body.poll}, {$inc: {votes3: 1}}, function(err,results){
        res.end();
      })
    }
    else if(req.body.option ==4){
      console.log('4');
      Poll.update({_id : req.body.poll}, {$inc: {votes4: 1}}, function(err,results){
        res.end();
      })
    }
    else{
      res.end();
    }
  }
 }
})();

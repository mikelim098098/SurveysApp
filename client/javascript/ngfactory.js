// My angular factory
myApp.factory('Factory', function($http){
  
var factory = {};
var user = {};
var polls = [];
var poll = [];

factory.login = function(info,callback){
  $http.post('/login',info).success(function(output){
    user = output;
    callback(user);
  })
}

factory.getSession = function(callback){
  $http.get('/session').success(function(output){
    user = output;
    callback(user);
  })
}

factory.logout = function(){
  $http.post('/session').success(function(output){

  })
}

factory.add_poll = function(info,callback){
  $http.post('/poll',info).success(function(output){
    callback(output);
    console.log(output);
  })
} 

factory.get_polls = function(callback){
  $http.get('/polls').success(function(output){
    polls = output
    callback(polls);
  })
}

factory.delete_poll = function(info){
  $http.post('/delete_poll',info).success(function(output){
  })
}

factory.getPoll = function(info,callback){
  console.log('factory');
  $http.post('/poll_info',info).success(function(output){
    callback(output)
  })
}

factory.voteUp = function(info,callback){
  $http.post('/voteUp', info).success(function(output){
  })
}

return factory
});

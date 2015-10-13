var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
$routeProvider
  .when('/',{
      templateUrl: 'partials/dashboard.html'
  })
  .when('/login',{
      templateUrl: 'partials/login.html'
  })
  .when('/create',{
      templateUrl: 'partials/create.html'
  })
  .when('/poll/:id',{
      templateUrl: 'partials/poll.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

// My Angular Controller
myApp.controller('userController', function ($scope, Factory, $routeParams, $location){
  $scope.error ='';
  $scope.user = {};
  $scope.session = {};
  $scope.poll = {};
  $scope.polls = [];
  $scope.poll_info = []
  $scope.vote = {};

  if($routeParams.id != undefined){
    // console.log('here',$routeParams);
    Factory.getPoll($routeParams,function(output){
      $scope.poll_info = output;
      console.log(output);
    });
  }

  Factory.getSession(function(output){
    if (output.length == 0){
      $location.url('/login')
    }
    else{
      $scope.session = output;
    }
      
  });

  Factory.get_polls(function(output){
    $scope.polls = output;
  })

  $scope.login = function(){
    if($scope.user.name != ''){
      Factory.login($scope.user,function(output){
        $scope.error = '';      
        $scope.session = output;
        $location.url('/dashboard');
      });
    }
    else{
      $scope.error = 'Please Enter a Name'
    }
  }

  $scope.logout = function(){
    Factory.logout();
    $location.url('/login');
  }

  $scope.new_poll = function(){
    $location.url('/create');
  }

  $scope.home = function(){
    $location.url('/');
  }

  $scope.add_poll = function(){
    console.log($scope.poll);
    Factory.add_poll($scope.poll,function(output){
      if(output.error){
        $location.url('/');
      }
    });
  }

  $scope.delete = function(info){
    Factory.delete_poll(info);
    console.log($scope.polls.indexOf(info));
    $scope.polls.splice($scope.polls.indexOf(info),1);
  }

  $scope.voteUp = function(poll,option){
    $scope.vote.poll = poll._id;
    $scope.vote.option = option;
    Factory.voteUp($scope.vote);
    if(option == 1){
      temp = $scope.poll_info.votes1;
      $scope.poll_info.votes1 = temp + 1;
    }
    else if(option == 2){
      temp = $scope.poll_info.votes2;
      $scope.poll_info.votes2 = temp + 1;
    }
    else if(option == 3){
      temp = $scope.poll_info.votes3;
      $scope.poll_info.votes3 = temp + 1;
    }else if(option == 4){
      temp = $scope.poll_info.votes4;
      $scope.poll_info.votes4 = temp + 1;
    }
  }
})

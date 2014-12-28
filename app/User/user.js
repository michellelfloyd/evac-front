'use strict';

angular.module('myApp.user', ['ngRoute', 'ngCookies'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'user/user.html',
      controller: 'UserCtrl'
    });
  }])

  .controller('UserCtrl', ['$scope', 'UserService', '$location',
    function ($scope, UserService, $location) {
    $scope.login = function(){
      UserService.attemptLogin($scope.user).then(function(user){
        console.log(user);
        $location.path('/people')
      });
    };

  }]);





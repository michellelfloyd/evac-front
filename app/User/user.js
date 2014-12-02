'use strict';

angular.module('myApp.user', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'user/user.html',
      controller: 'UserCtrl'
    });
//    $routeProvider.when('/documents', {
//      templateUrl: 'documents/documents.html',
//      controller: 'DocumentsCtrl'
//    });
  }])

  .controller('UserCtrl', ['$scope', function ($scope) {

  }])
  .directive('login', function () {
    return {
      restrict: 'A',
      template: " <form> " +
        "<label>Username</label>" +
        "<input type='text' ng-model='username'>" +
        "<label>Password</label>" +
        "<input type='password' ng-model='password'>" +
        "<br>" +
        "<input type='submit'>" +
        "</form>",
      link: function (scope, elem, attrs) {

        elem.bind('submit', function () {

          var user_data = {
            "username": scope.username,
            "password": scope.password
          };
        })
      }
    }
  })
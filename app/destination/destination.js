'use strict';

angular.module('myApp.destination', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/destination', {
    templateUrl: 'destination/destination.html',
    controller: 'destinationCtrl'
  });
}])

.controller('destinationCtrl', ['$scope', function($scope) {

    }])


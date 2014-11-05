'use strict';

angular.module('myApp.destination', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/destination', {
    templateUrl: 'destination/destination.html',
    controller: 'destinationCtrl'
  });
}])

.controller('DestinationCtrl', ['$scope', 'Restangular', function($scope, Restangular) {


     Restangular.all('route/').getList().then(function(route) {
      $scope.route = route;

    });
}]);


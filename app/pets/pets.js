'use strict';

angular.module('myApp.pets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pets', {
    templateUrl: 'pets/pets.html',
    controller: 'PetsCtrl'
  });
}])

.controller('PetsCtrl', ['$scope', function($scope) {

}]);
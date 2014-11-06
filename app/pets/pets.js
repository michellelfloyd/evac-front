'use strict';

angular.module('myApp.pets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pets', {
    templateUrl: 'pets/pets.html',
    controller: 'PetsCtrl'
  });
}])

.controller('PetsCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

    Restangular.all('pet/').getList().then(function(pet) {
      $scope.pet = pet;

    });

}]);
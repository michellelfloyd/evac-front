'use strict';

angular.module('myApp.valuables', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/valuables', {
    templateUrl: 'valuables/valuables.html',
    controller: 'ValuablesCtrl'
  });
}])

.controller('ValuablesCtrl', ['$scope', function($scope) {

}]);
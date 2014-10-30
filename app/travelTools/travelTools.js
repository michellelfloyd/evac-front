'use strict';

angular.module('myApp.travelTools', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/travelTools', {
    templateUrl: 'travelTools/travelTools.html',
    controller: 'TravelToolsCtrl'
  });
}])

.controller('TravelToolsCtrl', ['$scope', function($scope) {

}]);
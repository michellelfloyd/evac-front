'use strict';

angular.module('myApp.people', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/people', {
    templateUrl: 'people/people.html',
    controller: 'PeopleCtrl'
  });
}])

.controller('PeopleCtrl', ['$scope', function($scope) {

}]);
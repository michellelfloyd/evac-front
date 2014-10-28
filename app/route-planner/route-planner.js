'use strict';

angular.module('myApp.route-planner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/route-planner', {
    templateUrl: 'route-planner/route-planner.html',
    controller: 'RoutePlannerCtrl'
  });
}])

.controller('RoutePlannerCtrl', [function() {

}]);
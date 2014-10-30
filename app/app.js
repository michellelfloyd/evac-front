'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.who-what',
    'myApp.people',
    'myApp.pets',
    'myApp.documents',
    'myApp.valuables',
    'myApp.travelTools',
    'myApp.emergency',
    'myApp.version',
    'ui.bootstrap'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/who-what'});
    }]);

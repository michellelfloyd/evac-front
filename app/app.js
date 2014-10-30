'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.who-what',
    'myApp.view2',
    'myApp.version',
    'ui.bootstrap',
    'myApp.destination'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/who-what'});
    }]);

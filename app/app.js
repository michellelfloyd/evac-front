'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'google-maps'.ns(),
  'myApp.view1',
  'myApp.route-planner',
  'myApp.version',
  'ui.bootstrap'
]).
config(['$routeProvider', 'GoogleMapApiProvider'.ns(), function($routeProvider, GoogleMapApi) {
  $routeProvider.otherwise({redirectTo: '/view1'});

        GoogleMapApi.configure({
            key: 'AIzaSyBgI1EKHNT3ArARMd9U9Ya4JYtHomJKL4E',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
}]);

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'google-maps'.ns(),
        'myApp.route-planner',
        'myApp.version',
        'ui.bootstrap',
        'myApp.who-what',
        'myApp.view2',
        'myApp.version',
        'ui.bootstrap',
        'myApp.destination',
        'myApp.people',
        'myApp.pets',
        'myApp.documents',
        'myApp.valuables',
        'myApp.travelTools',
        'myApp.emergency'
    ]).
    config(['$routeProvider', 'GoogleMapApiProvider'.ns(), 'RestangularProvider', function ($routeProvider, GoogleMapApi, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});

        GoogleMapApi.configure({
            key: 'AIzaSyBgI1EKHNT3ArARMd9U9Ya4JYtHomJKL4E',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });

        RestangularProvider.setBaseUrl('http://localhost:8001');
    }]);

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'google-maps'.ns(),
        'myApp.route-planner',
        'myApp.version',
        'ui.bootstrap',
        'restangular',
        'myApp.services',
        'myApp.who-what',
        'myApp.version',
        'myApp.destination',
        'myApp.people',
        'myApp.pets',
        'myApp.documents',
        'myApp.valuables',
        'myApp.travelTools',
        'myApp.emergency',
        'myApp.add-person',
        'myApp.add-pet',
        'myApp.pet-detail'
    ]).
    config(['$routeProvider', 'GoogleMapApiProvider'.ns(), 'RestangularProvider', function ($routeProvider, GoogleMapApi, RestangularProvider) {
        $routeProvider.when('/who-what', {
            templateUrl: 'who-what/who-what.html',
            controller: 'WhoWhatCtrl'
        });

        $routeProvider.when('/destination', {
            templateUrl: 'destination/destination.html',
            controller: 'DestinationCtrl'
        });


        GoogleMapApi.configure({
            key: 'AIzaSyBgI1EKHNT3ArARMd9U9Ya4JYtHomJKL4E',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });

        $routeProvider.otherwise({redirectTo: '/who-what'});

        RestangularProvider.setBaseUrl('http://localhost:8001');
    }]);

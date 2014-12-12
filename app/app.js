'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'google-maps'.ns(),
        'myApp.route-planner',
        'myApp.version',
        'ui.bootstrap',
        'restangular',
        'myApp.user',
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
        'myApp.pet-detail',
        'ngCookies'
    ]).
    config(['$routeProvider', 'GoogleMapApiProvider'.ns(), 'RestangularProvider', function ($routeProvider, GoogleMapApi, RestangularProvider) {
        $routeProvider
        .when('/who-what', {
            templateUrl: 'who-what/who-what.html',
            controller: 'WhoWhatCtrl'
        })
        .when('/destination', {
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
    }])
  .run(['$cookieStore', 'Restangular', '$location', 'UserService', '$rootScope',
   function($cookieStore, RestangularProvider, $location, UserService, $rootScope){
    var LOGIN = '/login';

    RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params) {
      var token = $cookieStore.get('token');
      if (token) headers['Authorization'] = 'Token '+token;

      return { element: element, params: params, headers: headers }
    });


    var authCheck = function(event, next, current) {
      if (UserService.isAuthenticating()) return;
      if (!UserService.isLoggedIn()) {
        // not logged in so redirect back to login
        $location.path(LOGIN);
      }
    };

    // if not logged in, reroute, logout and don't load called controller
    $rootScope.$on("$locationChangeStart", authCheck);

    // if url is typed in, locationChangeStart doesn't seem to work
    $rootScope.$on("$routeChangeStart", authCheck);
  }]);

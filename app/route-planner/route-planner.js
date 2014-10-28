'use strict';

angular.module('myApp.route-planner', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/route-planner', {
            templateUrl: 'route-planner/route-planner.html',
            controller: 'RoutePlannerCtrl'
        });
    }])

    .controller('RoutePlannerCtrl', ['$scope', 'GoogleMapApi'.ns(), function ($scope, GoogleMapApi) {

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

        GoogleMapApi.then(function (maps) {
            console.log(maps);
        });
    }]);
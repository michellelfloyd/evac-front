'use strict';

angular.module('myApp.route-planner', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/route-planner', {
            templateUrl: 'route-planner/route-planner.html',
            controller: 'RoutePlannerCtrl'
        });
    }])

    .controller('RoutePlannerCtrl', ['$scope', 'GoogleMapApi'.ns(), function ($scope, GoogleMapApi) {

        $scope.locations = [
            'orem, ut',
            'payson, ut'
        ];

        GoogleMapApi.then(function (maps) {
            $scope.maps = maps;
            console.log(maps);
            $scope.initialize();
        });

        $scope.initialize = function () {
            $scope.rendererOptions = {
                draggable: true
            };
            $scope.directionsDisplay = new $scope.maps.DirectionsRenderer($scope.rendererOptions);;
            $scope.directionsService = new $scope.maps.DirectionsService();
            $scope.map;
            $scope.travelModes = [
                {
                    name: "driving",
                    value: $scope.maps.TravelMode.DRIVING
                },
                {
                    name: "walking",
                    value: $scope.maps.TravelMode.WALKING
                },
                {
                    name: "bicycling",
                    value: $scope.maps.TravelMode.BICYCLING
                },
                {
                    name: "transit",
                    value: $scope.maps.TravelMode.TRANSIT
                }

            ]


            $scope.directionsDisplay = new $scope.maps.DirectionsRenderer($scope.rendererOptions);
//            $scope.chicago = new $scope.maps.LatLng(41.850033, -87.6500523);
            var mapOptions = {
                zoom: 7
            };
            $scope.map = new $scope.maps.Map(document.getElementById('map-canvas'), mapOptions);

            $scope.directionsDisplay.setMap($scope.map);
            $scope.directionsDisplay.setPanel(document.getElementByID("directionsPanel"));
            $scope.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
                computeTotalDistance(directionsDisplay.directions);
            });

            calcRoute()
        };

        $scope.calcRoute = function () {
            var request = {
                origin: $scope.start,
                destination: $scope.end,
//                travelMode: $scope.maps.TravelMode.DRIVING
                travelMode: $scope.travelMode
            };
            $scope.directionsService.route(request, function (response, status) {
                if (status == $scope.maps.DirectionsStatus.OK) {
                    $scope.directionsDisplay.setDirections(response);
                    $scope.directionsDisplay.setPanel(document.getElementById("directionsPanel"));
                }
            });

            $scope.maps.event.trigger($scope.map, 'resize');
        };


//    GoogleMapApi.then(function (maps) {
//      console.log(maps);
//
//      directionsDisplay = new maps.DirectionsRenderer();
//      var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//      var mapOptions = {
//        center: new maps.LatLng(20.68177501, -103.3514794),
//        zoom: 15,
//        mapTypeId: maps.MapTypeId.ROADMAP
//      };
//      var map = new maps.Map(document.getElementById("map-canvas"), mapOptions);
//
//      directionsDisplay.setMap(map);
//
//      directionsDisplay.setPanel(document.getElementById("directionsPanel"));
//
//      var directionsService = new maps.DirectionsService();
//
//      var directionsDisplay = new maps.DirectionsRenderer();
//
//      var request = {
//        origin: 'orem, ut',
//        destination: 'payson, ut',
//        travelMode: maps.TravelMode.DRIVING
//      };
//
//      directionsService.route(request, function(response, status) {
//        if (status == google.maps.DirectionsStatus.OK) {
//          directionsDisplay.setDirections(response);
//        }
//
//
//      });
//
//
//    });


    }]);
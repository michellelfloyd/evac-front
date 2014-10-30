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

        $scope.travelMode = $scope.maps.TravelMode.DRIVING
        $scope.start = "new york"
        $scope.end = "new york"
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
            $scope.directionsDisplay.setPanel(document.getElementById("directionsPanel"));
            $scope.maps.event.addListener($scope.directionsDisplay, 'directions_changed', function() {
                $scope.computeTotalDistance($scope.directionsDisplay.getDirections());
            });

            $scope.calcRoute()
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

        $scope.computeTotalDistance = function (result) {
            var total = 0;
            var myroute =result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }
            total = total / 1000.0
            document.getElementById('total').innerHTML = total + 'km';
        }




    }]);
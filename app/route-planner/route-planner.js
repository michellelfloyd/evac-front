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
            'payson, ut',
            'springville, ut'
        ];


        $scope.waypoints = [];

        $scope.input = document.getElementById('searchTextField');
        $scope.autoComplete = new google.maps.places.Autocomplete(input);

        google.maps.event.addListener($scope.autoComplete, 'place_changed', function () {
            var place = $scope.autoComplete.getPlace();
            $scope.selected = place.formatted_address;
        });

        $scope.addWaypoint = function () {

            var locationObject = {location: $scope.selected};
            $scope.waypoints.push(locationObject);
            $scope.calcRoute();
        };

        $scope.deleteWaypoint = function (waypoint) {

            var index = $scope.waypoints.indexOf(waypoint);
            if (index > -1) {
                $scope.waypoints.splice(index, 1);
                $scope.calcRoute()
            }
        };

        $scope.BankControl = function (controlDiv, map) {

            controlDiv.style.padding = '5px';

            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = 'white';
            controlUI.style.borderStyle = 'solid';
            controlUI.style.borderWidth = '2px';
            controlUI.style.cursor = 'pointer';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to find banks nearby';
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('div');
            controlText.style.fontFamily = 'Arial,sans-serif';
            controlText.style.fontSize = '12px';
            controlText.style.paddingLeft = '4px';
            controlText.style.paddingRight = '4px';
            controlText.innerHTML = '<b>Bank</b>';
            controlUI.appendChild(controlText);

            $scope.maps.event.addDomListener(controlUI, 'click', function () {
                var infowindow;
                var newYork = new $scope.maps.LatLng(40.69847032728747, -73.9514422416687);
                var request = {

                    location: newYork,
                    radius: 500,
                    types: ['bank']
                };
                $scope.infowindow = new $scope.maps.InfoWindow();
                var service = new $scope.maps.places.PlacesService($scope.map);
                service.nearbySearch(request, $scope.callback);

            });

            $scope.callback = function (results, status) {
                if (status == $scope.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        $scope.createMarker(results[i]);
                    }
                }
            }

            $scope.createMarker = function (place) {
                var placeLoc = place.geometry.location;
                var marker = new $scope.maps.Marker({
                    map: $scope.map,
                    position: place.geometry.location
                })

                $scope.maps.event.addListener(marker, 'click', function () {
                    $scope.infowindow.setContent(place.name);
                    $scope.infowindow.open($scope.map, this);
                });
            }

        };


        GoogleMapApi.then(function (maps) {
            $scope.maps = maps;
            console.log(maps);
            $scope.initialize();
        });

        $scope.initialize = function () {


            $scope.travelMode = $scope.maps.TravelMode.DRIVING;
            $scope.start = "new york";
            $scope.end = "new york";
            $scope.rendererOptions = {
                draggable: true
            };
            $scope.directionsDisplay = new $scope.maps.DirectionsRenderer($scope.rendererOptions);
            $scope.directionsService = new $scope.maps.DirectionsService();


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

            ];


            $scope.directionsDisplay = new $scope.maps.DirectionsRenderer($scope.rendererOptions);
//            $scope.chicago = new $scope.maps.LatLng(41.850033, -87.6500523);
            var mapOptions = {
                zoom: 7
            };
            $scope.map = new $scope.maps.Map(document.getElementById('map-canvas'), mapOptions);

            $scope.directionsDisplay.setMap($scope.map);
            $scope.directionsDisplay.setPanel(document.getElementById("directionsPanel"));
            $scope.maps.event.addListener($scope.directionsDisplay, 'directions_changed', function () {
                $scope.computeTotalDistance($scope.directionsDisplay.getDirections());
            });

            $scope.calcRoute()
        };

        $scope.calcRoute = function () {
            var request = {
                origin: $scope.start,
                destination: $scope.end,
//                travelMode: $scope.maps.TravelMode.DRIVING
                waypoints: $scope.waypoints,
                optimizeWaypoints: true,
                travelMode: $scope.travelMode
            };
            $scope.directionsService.route(request, function (response, status) {
                if (status == $scope.maps.DirectionsStatus.OK) {
                    $scope.directionsDisplay.setDirections(response);
                    $scope.directionsDisplay.setPanel(document.getElementById("directionsPanel"));
                }
            });

            $scope.bankControlDiv;

            $scope.bankControlDiv = document.createElement('div');
            $scope.bankControl = new $scope.BankControl($scope.bankControlDiv, $scope.map);
            $scope.bankControlDiv.index = 1;
            $scope.map.controls[$scope.maps.ControlPosition.TOP_RIGHT].push($scope.bankControlDiv);


            $scope.maps.event.trigger($scope.map, 'resize');
        };

        $scope.computeTotalDistance = function (result) {
            var total = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }
            total = total / 1000.0;
            document.getElementById('total').innerHTML = total + 'km';
        }


    }]);


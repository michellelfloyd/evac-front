'use strict';
var globalWaypoints = [];

angular.module('myApp.route-planner', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/route-planner', {
            templateUrl: 'route-planner/route-planner.html',
            controller: 'RoutePlannerCtrl'
        });
    }])

    .controller('RoutePlannerCtrl', ['$scope', 'GoogleMapApi'.ns(), function ($scope, GoogleMapApi) {

        $scope.locations = [
            "Orem, UT",
            "Springville, UT",
            "Payson, UT"
        ];


        $scope.waypoints = [];
        $scope.waypointNames = [];
        $scope.currentMarkers = [];

//        $scope.input = document.getElementById('searchTextField');
//        $scope.autoComplete = new google.maps.places.Autocomplete(input);
//        var markerHandler = function() {
//            $scope.maps.event.addListener($scope.map.marker, 'click', function () {
//                var place = $scope.maps.marker.getPosition();
//                $scope.selected = place.latLng;
//            });
//        }
        $scope.addWaypoint = function (placeString) {

            var numString = placeString.replace(/[()]/g,'');
            var splitLocation = numString.split(",");
            var floatLat = parseFloat(splitLocation[0]);
            var floatLong = parseFloat(splitLocation[1]);
//            var locationObject = $scope.maps.Geocoder(placeString);
            var locationObject = new $scope.maps.LatLng(floatLat, floatLong);
            globalWaypoints.push({location: locationObject});

            var location = {location: locationObject};
            $scope.waypoints.push(location);

            $scope.$apply();
            $scope.calcRoute();

        };

        $scope.addWaypointName = function(stringName) {
//            var wwName = stringName;
            $scope.waypointNames.push({name: stringName});

            $scope.$apply();
//            console.log(place);
//            console.log(place.name);
//            console.log(place.vicinity);
//            $scope.waypointNames.push({
//                name: place.name,
//                address: place.vicinity
//            });
//            $scope.$apply();
//            $scope.addWaypointVic = function(vicString) {
//                $scope.waypointNames.push({name: wwName, address: vicString});
//                $scope.apply();
//            };
        };

        $scope.deleteWaypoint = function (waypointName) {

            var index = $scope.waypointNames.indexOf(waypointName);
            if (index > -1) {
                $scope.waypoints.splice(index, 1);
                globalWaypoints.splice(index, 1);
                $scope.waypointNames.splice(index, 1);
                $scope.calcRoute()
            }
        };

        var removeMarkers = function() {

            if ($scope.currentMarkers) {
                for (var i = 0; i < $scope.currentMarkers.length; i++) {
                    var currentMarker = $scope.currentMarkers[i];
                    currentMarker.setMap(null);
                }
            }

            $scope.currentMarkers = [];
        };

        $scope.SearchControl = function (controlDiv, map, searchCategory, buttonName, buttonIcon) {

            controlDiv.style.padding = '5px';
            controlDiv.index = 10;

            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = 'white';
            controlUI.style.borderStyle = 'solid';
            controlUI.style.borderWidth = '2px';
            controlUI.style.cursor = 'pointer';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to find ' + buttonName +'s nearby';
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('div');
            controlText.style.fontFamily = 'Arial,sans-serif';
            controlText.style.fontSize = '12px';
            controlText.style.paddingLeft = '4px';
            controlText.style.paddingRight = '4px';
            controlText.innerHTML = '<b><i class="' +buttonIcon + '"></i> ' +buttonName + '</b>';
            controlUI.appendChild(controlText);


            var registerButton = function(searchCategory) {

                removeMarkers();

                var newYork = new $scope.maps.LatLng(40.69847032728747, -73.9514422416687);
                var center = $scope.map.getCenter();
                var request = {
                    location: center,
                    radius: 50000,
                    types: [searchCategory]
                };
                $scope.infowindow = new $scope.maps.InfoWindow();
                var service = new $scope.maps.places.PlacesService($scope.map);
                service.nearbySearch(request, $scope.callback);
            };

            $scope.maps.event.addDomListener(controlUI, 'click', function() { registerButton(searchCategory.toLowerCase())} );

            $scope.callback = function (results, status) {
                if (status == $scope.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        $scope.createMarker(results[i]);
                    }
                }
            };

            $scope.createMarker = function (place) {
                var placeLoc = place.geometry.location;
                var marker = new $scope.maps.Marker({
                    map: $scope.map,
                    position: place.geometry.location
                });

                $scope.currentMarkers.push(marker);

//                console.log(place);
//                var stringDict = JSON.stringify(place);

//                console.log(stringDict);
                var contentString =
                    place.name +
                    '<div></div>' +
                    place.vicinity +
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<div id="bodyContent">' +
                    '<button onclick="$(\'#bodyContent\').scope().addWaypoint(\'' + place.geometry.location + '\'); $(\'#bodyContent\').scope().addWaypointName(\'' + place.name + '\'); console.log(\'You clicked\')">Add</button>' +
                    '</div>' +
                    '</div>';

                $scope.maps.event.addListener(marker, 'click', function () {
                    $scope.infowindow.setContent(contentString);
                    $scope.infowindow.open($scope.map, this);

                });
            }

        };

        var createButtons = function() {
            createButton('bank', 'Bank', 'fa fa-bank');
            createButton('hospital', 'Hospital', 'fa fa-hospital-o');
            createButton('church', 'Church', 'fa fa-fire');
            createButton('pharmacy', 'Pharmacy', 'fa fa-medkit');
            createButton('veterinary_care', 'Veterinarian', 'fa fa-paw');
            createButton('grocery_or_supermarket', 'Grocery Store', 'fa fa-shopping-cart');
            createButton('restaurant', 'Restaurant', 'fa fa-cutlery');
            createButton('gas_station', 'Gas Station', 'fa fa-car');
            createButton('airport', 'Airport', 'fa fa-plane');

        };

        var createButton = function(searchCategory, buttonName, buttonIcon) {
            $scope.searchControlDiv = document.createElement('div');
            $scope.searchControl = new $scope.SearchControl($scope.searchControlDiv, $scope.map, searchCategory, buttonName, buttonIcon);
            $scope.searchControlDiv.index = 1;
            $scope.map.controls[$scope.maps.ControlPosition.RIGHT_BOTTOM].push($scope.searchControlDiv);
        };


        GoogleMapApi.then(function (maps) {
            $scope.maps = maps;
            console.log(maps);
            $scope.initialize();
        });

        $scope.initialize = function () {


//            markerHandler()
            $scope.travelMode = $scope.maps.TravelMode.DRIVING;
            var newYork = new $scope.maps.LatLng(40.69847032728747, -73.9514422416687);
            $scope.start = newYork;
            $scope.end = newYork;
            $scope.rendererOptions = {
                draggable: true
            };
            $scope.directionsDisplay = new $scope.maps.DirectionsRenderer($scope.rendererOptions);
            $scope.directionsService = new $scope.maps.DirectionsService();

            $scope.travelModes = [
                {
                    name: "Driving",
                    value: $scope.maps.TravelMode.DRIVING
                },
                {
                    name: "Walking",
                    value: $scope.maps.TravelMode.WALKING
                },
                {
                    name: "Bicycling",
                    value: $scope.maps.TravelMode.BICYCLING
                },
                {
                    name: "Transit",
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

            createButtons();

            $scope.searchControlDiv;

            $scope.calcRoute()
        };

        $scope.calcRoute = function () {
            var request = {
                origin: $scope.start,
                destination: $scope.end,
//                travelMode: $scope.maps.TravelMode.DRIVING
                waypoints: globalWaypoints,
                optimizeWaypoints: true,
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
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }
            total = total / 1000.0;
                var totalMiles = total * 0.621371;
            document.getElementById('total').innerHTML = totalMiles + ' mi - ' + total + ' km';
        }
    }]);
'use strict';

angular.module('myApp.route-planner', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/route-planner', {
      templateUrl: 'route-planner/route-planner.html',
      controller: 'RoutePlannerCtrl'
    });
  }])

  .controller('RoutePlannerCtrl', ['$scope', 'GoogleMapApi'.ns(), function ($scope, GoogleMapApi) {

//    $scope.map = {
//      center: {
//        latitude: 45,
//        longitude: -73
//      },
//      zoom: 8
//    };

    $scope.locations = [
      'orem, ut',
      'payson, ut'
    ]

    GoogleMapApi.then(function (maps) {
      $scope.maps = maps;
      $scope.initialize();
    });

    $scope.initialize = function () {
      $scope.directionsDisplay;
      $scope.directionsService = new $scope.maps.DirectionsService();
      $scope.map;

      $scope.directionsDisplay = new $scope.maps.DirectionsRenderer();
      var chicago = new $scope.maps.LatLng(41.850033, -87.6500523);
      var mapOptions = {
        zoom: 7,
        center: chicago
      };
      $scope.map = new $scope.maps.Map(document.getElementById('map-canvas'), mapOptions);
      $scope.directionsDisplay.setMap($scope.map);
    };

    $scope.calcRoute = function () {
      var request = {
        origin: $scope.start,
        destination: $scope.end,
        travelMode: $scope.maps.TravelMode.DRIVING
      };
      $scope.directionsService.route(request, function (response, status) {
        if (status == $scope.maps.DirectionsStatus.OK) {
          $scope.directionsDisplay.setDirections(response);
        }
      });
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
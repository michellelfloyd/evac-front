'use strict';

angular.module('myApp.destination', ['ngRoute', 'restangular'])

    .controller('DestinationCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
        $scope.templates =
        [
            {name: "address.html", url: "address.html"},
            {name: "contact.html", url: "contact.html"},
            {name: "household-name.html", url: "household-name.html"},
            {name: "save.html", url: "save.html"},
            {name: "type.html", url: "type.html"}
        ];

        $scope.template = $scope.templates[0];

        Restangular.all('route/').getList().then(function(route) {
          $scope.route = route;

        });

    }]);


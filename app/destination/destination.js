'use strict';

angular.module('myApp.destination', ['ngRoute'])

    .controller('DestinationCtrl', ['$scope', function($scope) {
        $scope.templates =
        [
            {name: "address.html", url: "address.html"},
            {name: "contact.html", url: "contact.html"},
            {name: "household-name.html", url: "household-name.html"},
            {name: "save.html", url: "save.html"},
            {name: "type.html", url: "type.html"}
        ];

<<<<<<< HEAD
.controller('DestinationCtrl', ['$scope', 'Restangular', function($scope, Restangular) {


     Restangular.all('route/').getList().then(function(route) {
      $scope.route = route;

    });
}]);
=======
        $scope.template = $scope.templates[0];
    }]);
>>>>>>> All of my destination additions. Includes separate HTML pages for each section that will be ng-included and lots of styling changes on app.css


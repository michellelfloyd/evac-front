'use strict';

angular.module('myApp.people', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/people', {
            templateUrl: 'people/people.html',
            controller: 'PeopleCtrl'
        });
    }])

    .controller('PeopleCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

        $scope.addPerson = "add-person/add-person.html";

        $scope.getPeople = function () {
            Restangular.all('people/').getList().then(function (people) {
                $scope.people = people;
            });
        };

        $scope.getPeople();

    }]);
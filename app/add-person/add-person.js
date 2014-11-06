'use strict';

angular.module('myApp.add-person', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-person', {
      templateUrl: 'add-person/add-person.html',
      controller: 'AddPersonCtrl'
    });
  }])

  .controller('AddPersonCtrl', ['$scope', function ($scope) {
    $scope.person = {gender: null};
    $scope.genders = ['M', 'F'];

    $scope.months = [
      {
        str: "January",
        num: 1
      },
      {
        str: "February",
        num: 2
      },
      {
        str: "March",
        num: 3
      },
      {
        str: "April",
        num: 4
      },
      {
        str: "May",
        num: 5
      },
      {
        str: "June",
        num: 6
      },
      {
        str: "July",
        num: 7
      },
      {
        str: "August",
        num: 8
      },
      {
        str: "September",
        num: 9
      },
      {
        str: "October",
        num: 10
      },
      {
        str: "November",
        num: 11
      },
      {
        str: "December",
        num: 12
      }
    ];
    $scope.years = [];
    for (var i = 0; i < 100; i++) {
      $scope.years.push(i);
    };
    $scope.malerelative = [
      "Father",
      "Son",
      "Grandfather",
      "Relative: Other",
      "Legal Guardian",
      "Caretaker",
      "Other(please specify)"
    ];
    $scope.femalerelative = [
      "Mother",
      "Daughter",
      "Grandmother",
      "Relative: Other",
      "Legal Guardian",
      "Caretaker",
      "Other(please specify)"
    ];

    function pickRelative(gender) {
      if (gender='M') {
        $scope.pickRelative = malerelative
      } else {
        $scope.pickRelative = femalerelative
      }
    }
    $scope.genderChange = function(){
      pickRelative = ($scope.person.gender);
    }

  }]);

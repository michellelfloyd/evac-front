'use strict';

angular.module('myApp.add-person', ['ngRoute', 'myApp.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-person', {
            templateUrl: 'add-person/add-person.html',
            controller: 'AddPersonCtrl'
        });
    }])

    .controller('AddPersonCtrl', ['$scope', 'Restangular', 'EvacPlanService', function ($scope, Restangular, EvacPlanService) {

        $scope.person = {gender: null, birthMonth: null};
        $scope.genders = ['Male', 'Female'];
        $scope.curYear = parseInt(new Date().getFullYear());
        $scope.startValidation = false;

        $scope.validateYear = function () {
            return $scope.person.birthYear > 1900 && $scope.person.birthYear <= $scope.curYear;
        };

        var conditionChecked = function () {
            var condList = [];
            for (var conditionId=0; conditionId < $scope.specialConditions.length; conditionId++) {
                var condition = $scope.specialConditions[conditionId];
                if (condition.hasOwnProperty('checked') && condition.checked) {
                    condList.push(condition.id);
                }
            }
            $scope.person.special_conditions = condList;
        };

        Restangular.all('special-conditions/').getList().then(function (specialConditions) {
            $scope.specialConditions = specialConditions;

        });


        $scope.months = [
            { str: "Month",
                num: null
            },
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
        for (var i = 1900; i < $scope.curYear; i++) {
            $scope.years.push(i);
        }
        ;
        $scope.malerelative = [
            "Father",
            "Son",
            "Grandfather",
            "Relative: Other",
            "Legal Guardian",
            "Caretaker",
            "Other"
        ];
        $scope.femalerelative = [
            "Mother",
            "Daughter",
            "Grandmother",
            "Relative: Other",
            "Legal Guardian",
            "Caretaker",
            "Other"
        ];


        $scope.genderChange = function () {
            if ($scope.person.gender == 'Male') {
                $scope.pickRelatives = $scope.malerelative
            } else {
                $scope.pickRelatives = $scope.femalerelative
            }
        };
        $scope.addPerson = function () {
            conditionChecked();
          $scope.person.parent = EvacPlanService.getToTake().id;
            Restangular.all('add-person/').customPOST($scope.person).then(function () {
                    alert("Your person was successfully added");
                }
            )
        };
    }]);


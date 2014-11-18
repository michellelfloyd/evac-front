'use strict';

angular.module('myApp.add-pet', ['ngRoute', 'myApp.services'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-pet', {
      templateUrl: 'add-pet/add-pet.html',
      controller: 'AddPetCtrl'
    });
  }])

  .controller('AddPetCtrl', ['$scope', 'Restangular', 'EvacPlanService', '$location', function ($scope, Restangular, EvacPlanService, $location) {
    $scope.animals = [
      {
        type: "None",
        checked: false
      },
      {
        type: "Dog",
        checked: false,
        disabled: false
      },
      {
        type: "Cat",
        checked: false,
        disabled: false
      },
      {
        type: "Bird",
        checked: false,
        disabled: false
      },
      {
        type: "Fish",
        checked: false,
        disabled: false
      },
      {
        type: "Other",
        checked: false,
        disabled: false
      }

    ];

    $scope.noneChecked = function (animal) {
      if (animal.type == "None") {
        for (var i = 1; i < $scope.animals.length; i++) {
          var currentAnimal = $scope.animals[i];
          currentAnimal.disabled = $scope.animals[0].checked;

        }
      } else {
        $scope.pet = animal;
      }
    };


//    $scope.otherChecked = function(animal){
//      if (animal.type == "Other"){
//
//      }
//    };


    $scope.addPets = function () {
      if ($scope.pet) {
        $scope.pet.parent = EvacPlanService.getToTake().id;
        Restangular.all('add-pet/').customPOST($scope.pet).then(function () {
            alert("Your pets were successfully added");
            $location.path('pet-detail/');
          }, function () {
            alert("Something is broken...FIX IT!");
          }
        )
      }
      else{
        $location.path('who-what/');
      }

    };

  }]);
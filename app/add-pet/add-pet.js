'use strict';

angular.module('myApp.add-pet', ['ngRoute', 'myApp.services'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-pet', {
      templateUrl: 'add-pet/add-pet.html',
      controller: 'AddPetCtrl'
    });
  }])

  .controller('AddPetCtrl', ['$scope', 'Restangular', 'EvacPlanService', '$location', function ($scope, Restangular, EvacPlanService, $location) {
//    $scope.typeNum = [];
//    for (var i = 1; i < 10; i++){
//      $scope.typeNum
//    }
    $scope.animals = [
      {
        type: "Don't have any pets",
        checked: false
      },
      {
        type: "Dog",
        checked: false,
        disabled: false,
        count: 0
      },
      {
        type: "Cat",
        checked: false,
        disabled: false,
        count: 0
      },
      {
        type: "Bird",
        checked: false,
        disabled: false,
        count: 0
      },
      {
        type: "Fish",
        checked: false,
        disabled: false,
        count: 0
      },
      {
        type: "Reptile",
        checked: false,
        disabled: false,
        count: 0
      },
      {
        type: "Other",
        checked: false,
        disabled: false,
        count: 0
      }

    ];

    $scope.noneChecked = function (animal) {
      if (animal.type == "Don't have any pets") {
        for (var i = 1; i < $scope.animals.length; i++) {
          var currentAnimal = $scope.animals[i];
          currentAnimal.disabled = $scope.animals[0].checked;
        }
      }
//      else {
////        $scope.pet = animal;
//      }
    };
//    $scope.petCount = function () {
//      for (var x = 0; x < $scope.animals.count; x++) {
//        var currentAnimal = $scope.animals[i];
//
//        Restangular.all('add-pet/').customPOST($scope.animals.type + $scope.animals.count);
//        console.log("currentAnimal")
//      }
//
//    };


    $scope.addPets = function () {
        for (var i = 0; i< $scope.animals.length; i++) {
          var animal = $scope.animals[i];
          for (var x = 0; x<animal.count; x++){
            var countType = animal.type + (x+1);
            var numAnimal = {
              name: countType,
              type: animal.type,
              parent: EvacPlanService.getToTake().id
            };
            console.log("numAnimal")
            Restangular.all('pet/').customPOST(numAnimal).then(function () {
//            alert("Your pets were successfully added");
            $location.path('pet-detail/');
          }, function () {
            alert("Something is broken...FIX IT!");
          }
        );
          }
        }
    if ($scope.animals[0].checked){
      $location.path('who-what/')
    };


    };



}]);

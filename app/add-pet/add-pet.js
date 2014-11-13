'use strict';

angular.module('myApp.add-pet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-pet', {
    templateUrl: 'add-pet/add-pet.html',
    controller: 'AddPetCtrl'
  });
}])

.controller('AddPetCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

    $scope.animals = [
      {
        type: "None",
        checked:false
      },
      {
        type: "Dog",
        checked:false,
        disabled:false
      },
      {
        type: "Cat",
        checked:false,
        disabled:false
      },
      {
        type: "Bird",
        checked:false,
        disabled:false
      },
      {
        type: "Fish",
        checked:false,
        disabled:false
      },
      {
        type: "Other",
        checked: false,
        disabled: false
      }

    ];

    $scope.noneChecked = function(animal){
      if (animal.type == "None"){
        for(var i=1; i<$scope.animals.length; i++) {
          var currentAnimal = $scope.animals[i];
          currentAnimal.disabled = $scope.animals[0].checked;

        }
      }
    };



     $scope.addPets = function() {
       Restangular.all('add-pet/').customPOST($scope.pet).then(function () {
           alert("Your pets were successfully added");
         }, function(){
           alert("Something is broken...FIX IT!");
         }
       )
     };

}]);
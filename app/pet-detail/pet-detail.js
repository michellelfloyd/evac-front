'use strict';

angular.module('myApp.pet-detail', ['ngRoute', 'myApp.services'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/pet-detail', {
      templateUrl: 'pet-detail/pet-detail.html',
      controller: 'PetDetailCtrl'
    });
  }])

  .controller('PetDetailCtrl', ['$scope', 'Restangular', 'EvacPlanService', '$location', function ($scope, Restangular, EvacPlanService, $location) {
    Restangular.all('pet/').getList().then(function (pet) {
      $scope.OneAtATime = true;
      $scope.pets = pet;
      $scope.petAge = [];
      for (var i = 0; i < 50; i++) {
        $scope.petAge.push(i);
      }
      function changeColor(){
        var radio = document.getElementsByClassName('(preference.choice)Radio')
        radio[0].style.backgroundColor = 'red'
      }
      $scope.preference = [
        {
          choice: "Leave at home",
          info: "Leaving a pet at home places this pet's life at risk. " +
            "Even if your home is not lost, " +
            "you must consider the implications " +
            "of your absence form the pet for however " +
            "long you are not at home (days to months " +
            "depending). Consider food, water, temperature, or other needs.",
          chosen: "Under some circumstances, " +
            "this may be the only option, " +
            "depending upon whether or not you " +
            "are able to evacuate pets or if shelters are completely full.",
          clicked: false
        },
        {
          choice: "Take to the nearest animal shelter",
          info: "Your nearest animal shelter is __ " +
            "miles and a __ minute drive away. Learn more using the map tool.",
          chosen: "In an evacuation situation, nearby animal shelters may be " +
            "overcrowded, or potentially unstaffed. It would be wise to contact " +
            "the animal shelter as soon as you know you’ll be evacuating. " +
            "1.Contact information for the 5 nearest animal shelters. " +
            "2.Find more using the map tool. " +
            "It would be wise to decide your backup plan in " +
            "case nearby animal shelters cannot take your pets.",
          clicked: false
        },
        {
          choice: "Evacuate with me to animal shelter near destination",
          info: "This will of course require enough space for pets " +
            "in your mode of transportation. You can select this option now " +
            "and adjust later after you figure out  what you want to bring and " +
            "what you’ll prioritize. ",
          chosen: "After you have entered potential " +
            "destinations, use the map tool to identify animal shelters near " +
            "each destination. iii.If you are evacuating to a nearby destination, " +
            "or one in which it is possible many others are evacuating to, you " +
            "may still have to deal with crowded animal shelters and booking.",
          clicked: false
        },
        {
          choice: "Evacuate with me to destination",
          info: "This will require enough space for pets in your mode " +
            "of transportation. You can select this option now and adjust" +
            " later after you determine what you want to bring and what you’ll " +
            "prioritize.",
          chosen: "You will want to be sure that whatever the " +
            "destination, your specific pets are permitted on the premises.",
          clicked: false
        }
      ];

      $scope.optionChecked = function () {
        if (preference.clicked) {

        }
      };

      $scope.backupPlan = function () {
        preference.choice
      };
      $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
      };

    });
    $scope.addDetails = function() {
      $scope.pet.parent = EvacPlanService.getToTake().id;
      Restangular.all('pet-detail/').customPOST($scope.pet).then(function () {
          alert("Your pets were successfully added");
        }, function () {
          alert("Something is broken...FIX IT!");
        }
      )
      };
    }
  ]);
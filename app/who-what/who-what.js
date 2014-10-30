'use strict';

angular.module('myApp.who-what', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/who-what', {
      templateUrl: 'who-what/who-what.html',
      controller: 'WhoWhatCtrl'
    });
  }])

  .controller('WhoWhatCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

       
        
    Restangular.all('people/').getList().then(function (people) {
      $scope.people = people;

    });

     Restangular.all('pet/').getList().then(function (pet){
            $scope.pet = pet;

        });

//        $scope.oneAtATime = true;
//        $scope.panel1 = false;
//        $scope.panel2 = false;
//        
// 
//        $scope.addItem = function () {
//            var newItemNo = $scope.items.length + 1;
//            $scope.items.push('Item ' + newItemNo);
//        };
//
    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

 }]);
'use strict';

angular.module('myApp.documents', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/documents', {
    templateUrl: 'documents/documents.html',
    controller: 'DocumentsCtrl'
  });
}])

.controller('DocumentsCtrl', ['$scope', function($scope) {

}]);
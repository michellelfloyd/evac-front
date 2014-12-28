'use strict';

angular.module('myApp.user')
  .service('UserService', ['Restangular', '$q', '$cookieStore', '$rootScope', '$location',
  function(Restangular, $q, $cookieStore, $rootScope, $location){
    var currentUser = null;
    var loggedIn = false;
    var authenticating = false;
    var _token = null;

    // watches the token cookie
    $rootScope.$watch(function () {
        return $cookieStore.get('token');
    }, function (token) {
        _token = token;
        if (!token) logout();
        else {
            loggedIn = true;
            authenticating = true;
            loginUserFromToken(token);
        }
    });



    this.attemptLogin = function(userData){
         var deferred = $q.defer();
         try{
           Restangular.all('api-token-auth/').customPOST(userData).then(function(user) {
             login(user);
             deferred.resolve(user);
           },function(result){
             deferred.reject(result);
           });
         }catch(err){

         }
         return deferred.promise;

    };
    this.isLoggedIn = function () {
        return loggedIn;
    };

    this.isAuthenticating = function () {
        return authenticating;
    };


    var login = function(user){
      $cookieStore.put('token', user.token);
      currentUser = angular.copy(user);
      loggedIn = true;
      authenticating = false;
      $rootScope.$broadcast('User:login-confirmed');

    };

     var logout = function () {
        $cookieStore.remove('token');
        currentUser = null;
        loggedIn = false;
        authenticating = false;
        $rootScope.$broadcast('User:logout-confirmed');
    };

    var loginUserFromToken = function (token) {
        authenticating = true;
        _token = token;
        // Fast, no need to optimize or cache at this point
        Restangular.one('user-token', token).get().then(
            // token auth success
            function (user) {
                login(user);
                $location.path('/people')
            },
            // in case token auth failed (ie, maybe cookie was changed)
            function (response) {
                logout()
            });
    };
  }]);

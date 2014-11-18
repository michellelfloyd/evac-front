angular.module('myApp.services', ['restangular'])

  .service('EvacPlanService', ['Restangular', '$q', function(Restangular, $q){
    this.evacPlan = null;
    toTake = null;

    Restangular.all('evac-plan/').getList().then(function(data){
        this.evacPlan = data[0];
     });

    Restangular.all('who-what/').getList().then(function(data){
        toTake = data[0];
     });

    this.createEvacPlan = function(){
      this.evacPlan = Restangular.all('evac-plan/').customPOST()
    };

    this.createToTake = function(){
      this.toTake = Restangular.all('who-what/').customPOST()
    };

    this.getEvacPlan = function(){
      // this will need to change once the login functionality is done
      // for now just grab the first evac plan

      return this.evacPlan;
    };

    this.getToTake = function(){
      // this will also change

      return toTake;
    };


  }]);
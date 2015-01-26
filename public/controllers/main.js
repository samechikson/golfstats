'use strict';

angular.module('golfDataMeanApp')
  .controller('MainCtrl', ['$scope', 'PthService', function ($scope, PthService) {
	$scope.newData = {};
    $scope.table = [];

    //Get existing data from db. Put it into table var.
    PthService.get().then(function(response){
        $scope.table = response.data.pths;
    }, function(err){
        console.warn(err);
    });

    $scope.addToTable = function(data){
    	data.direction = data.direction.toUpperCase();
    	//$scope.table.push(data);
    	console.log(data);
    	$scope.newData = {};

        PthService.create(data);
        //refresh table
        PthService.get().then(function(response){
            $scope.table = response.data.pths;
        }, function(err){
            console.warn(err);
        });

    	document.querySelector('input:first-of-type').focus();

    };
  }]);
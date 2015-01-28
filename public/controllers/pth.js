'use strict';

angular.module('golfDataMeanApp')
  .controller('PthCtrl', ['$scope', '$routeParams', 'DbService', function ($scope, $routeParams, DbService) {
	$scope.newData = {};
    $scope.table = [];
    $scope.tournament = {};

    DbService.getById('tournament', $routeParams.tournamentId).then(function(response){
        $scope.tournament = response.data;

        DbService.getAllWithFieldId('pth', 'tournament', $scope.tournament._id).then(function(response){
            //console.log(response.data);
            $scope.table = response.data;
        }, function(err){
            console.warn(err);
        });
    });

    // //Get existing data from db. Put it into table var.
    // DbService.getAll('pth').then(function(response){
    //     $scope.table = response.data;

    // }, function(err){
    //     console.warn(err);
    // });

    $scope.addToTable = function(data){
    	data.direction = data.direction.toUpperCase();
        data.tournament = $scope.tournament._id;
        data.date = new Date();
    	console.log(data);
    	$scope.newData = {};

        DbService.create('pth', data);
       // refresh table
        DbService.getAllWithFieldId('pth', 'tournament', $scope.tournament._id).then(function(response){
            $scope.table = response.data;
        }, function(err){
            console.warn(err);
        });

    	document.querySelector('input:first-of-type').focus();
    };
  }]);
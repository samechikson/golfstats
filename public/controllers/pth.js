'use strict';

angular.module('golfDataMeanApp')
  .controller('PthCtrl', ['$scope', '$routeParams', '$route', 'DbService', function ($scope, $routeParams, $route, DbService) {
	$scope.newData = {};
    $scope.table = [];
    $scope.tournament = {};
    $scope.graphMin = 50;
    $scope.graphMax = 300;

    console.log($scope);
    
    document.querySelector('input:first-of-type').focus();

    DbService.getById('tournament', $routeParams.tournamentId).then(function(response){
        $scope.tournament = response.data;

        DbService.getAllWithFieldId('pth', 'tournament', $scope.tournament._id).then(function(response){
            //console.log(response.data);
            $scope.table = response.data.reverse();
            //$scope.average = $scope.getAverage(response.data, 50, 300);
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

        DbService.create('pth', data).then(function(){
            //success
            // refresh table
            $route.reload();
        });
    };

    $scope.deletePth = function(id){
        DbService.delete('pth', id).then(function(response){
            //success
            $route.reload();
        });
    }

    $scope.getAverage = function(min, max){
        var avg = 0;
        var count = 0;
        var data = $scope.table;
        for (var i in data){
            if (data[i].distance >= min && data[i].distance <= max){
                avg += data[i].pth;
                count++;
            }
        }
        //console.log(avg);

        return (avg/count).toFixed(2);
    }
  }]);
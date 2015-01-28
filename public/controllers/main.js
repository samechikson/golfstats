'use strict';

angular.module('golfDataMeanApp')
.controller('MainCtrl', ['$scope', 'DbService', function ($scope, DbService) {
	$scope.tournaments = [];
	$scope.selectedTourney = {};

	DbService.getAll('tournament').then(function(response){
		//console.log(response.data);
		$scope.tournaments = response.data;
		$scope.selectedTourney = response.data[0] || {name: "No tournaments"};
	});


}]);
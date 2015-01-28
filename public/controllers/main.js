'use strict';

angular.module('golfDataMeanApp')
.controller('MainCtrl', ['$scope', '$route', 'DbService', function ($scope, $route, DbService) {
	$scope.tournaments = [];
	$scope.selectedTourney = {};

	DbService.getAll('tournament').then(function(response){
		//console.log(response.data);
		$scope.tournaments = response.data;
		$scope.selectedTourney = response.data[0] || {name: "No tournaments"};
	});


	$scope.changeSelected = function(tourney){
		$scope.selectedTourney = tourney;
	}

	$scope.deleteTourney = function(tourneyId){
		console.log(tourneyId);
		DbService.delete('tournament', tourneyId);
		$route.reload();
	}
}]);
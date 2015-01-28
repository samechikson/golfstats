angular.module('golfDataMeanApp', 
	['ngRoute',
	 'Db'
	])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	    $routeProvider
	    	.when('/', {
	    		templateUrl: 'views/main.html',
	    		controller: 'MainCtrl'
	    	})
	        .when('/pth/:tournamentId', {
	            templateUrl: 'views/pth.html',
	            controller: 'PthCtrl'
	        })

	    $locationProvider.html5Mode(true);

}]);

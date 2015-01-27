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

	    $locationProvider.html5Mode(true);

}]);

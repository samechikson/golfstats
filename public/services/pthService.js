angular.module('Pth', []).factory('PthService', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            console.log("getting pths");
            return $http.get('/api/pths');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new pth
        create : function(pthData) {
            return $http.post('/api/pth', pthData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/pth/' + id);
        }
    }       

}]);
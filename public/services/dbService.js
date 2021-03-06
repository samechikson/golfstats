angular.module('Db', []).factory('DbService', ['$http', function($http) {

    return {
        // call to get all
        getAll : function(collection) {
            console.log("getting all from " + collection +" collection")
            return $http.get('/api/'+collection+'s');
        },

        getAllWithFieldId : function(collection, field, id) {
            return $http.get('/api/'+collection+'s/'+field+'/'+id)
        },

        getById : function(collection, id){
            return $http.get('/api/'+collection+'/'+id)
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new pth
        create : function(collection, data) {
            return $http.post('/api/'+collection, data);
        },

        // call to DELETE a nerd
        delete : function(collection, id) {
            return $http.delete('/api/'+collection+'/' + id);
        }
    }       

}]);
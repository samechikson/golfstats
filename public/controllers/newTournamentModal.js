'use strict';

angular.module('golfDataMeanApp')
.controller('newTournamentModalCtrl', ['$scope', '$modal', '$route','DbService', function ($scope, $modal, $route, DbService) {
  console.log($scope);

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/newTournamentModal.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (data) {
      console.log(data);

      DbService.create('tournament', data);
      $route.reload();

    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };
}]);

angular.module('golfDataMeanApp')
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance, items) {

  $scope.ok = function () {
    if ($scope.tournament.name.length > 0)
      $modalInstance.close($scope.tournament);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
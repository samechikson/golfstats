'use strict';

angular.module('golfDataMeanApp')
.controller('newTournamentModalCtrl', ['$scope', '$modal', function ($scope, $modal) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/newTournamentModal.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function () {

    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };
}]);

angular.module('golfDataMeanApp')
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance, items) {

  $scope.ok = function () {
    $modalInstance.close('done');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
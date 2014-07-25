angular.module('yann.MiniRSS')
    .controller('CollectsCtrl', function ($scope, CollectList) {
        $scope.collects = CollectList.get();

        $scope.delete = function (id) {
            CollectList.delete(id);
        };

        $scope.$on('CollectList', function (event, data) {
            $scope.collects = data;
        })
    });

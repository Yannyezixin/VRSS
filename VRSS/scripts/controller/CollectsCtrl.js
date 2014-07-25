angular.module('yann.MiniRSS')
    .controller('CollectsCtrl', function ($scope, CollectList) {
        $scope.collects = CollectList.get();
    });

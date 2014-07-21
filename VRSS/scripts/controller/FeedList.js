angular.module('yann.MiniRSS')
    .controller('FeedListCtrl', function ($scope, FeedList) {
        $scope.feeds = FeedList.get();

        $scope.$on('FeedList', function (event, data) {
            $scope.feeds = data;
        });
    });

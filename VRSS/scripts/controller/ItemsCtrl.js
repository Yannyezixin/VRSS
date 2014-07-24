angular.module('yann.MiniRSS')
    .controller('ItemsCtrl', function ($scope, $routeParams, FeedList, FeedLoad) {
        var feed = FeedList.getById($routeParams.id || FeedList.getMinId())

        FeedLoad.fetch({q: feed.url, num: 100}, {}, function (data) {
            $scope.feed = data.responseData.feed;
            $scope.feed.id = feed.id;
            $scope.loading = false;
        });

        $scope.loading = true;
    });

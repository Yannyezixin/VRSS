angular.module('yann.MiniRSS')
    .controller('FeedManageCtrl', function ($scope, $location,UrlLookup, FeedLoad, FeedList) {
        $scope.feeds = FeedList.get();
        $scope.searchLoading = false;

        $scope.add = function () {
            FeedList.add($scope.feed.url, $scope.feed.title);
            $location.path('/manage');
        };

        $scope.delete = function(id) {
            FeedList.delete(id);
        };

        $scope.lookup = function () {
            $scope.searchLoading = true;
            UrlLookup.fetch({q: $scope.lookup.url}, {}, function (data) {
                if (data.responseStatus != 200 || (data.responseData && data.responseData.url == '')) {
                    $scope.searchLoading = false;
                    alert(data.responseDetails || 'Feed not found');
                    return;
                }

                $scope.feed = data.responseData;
                FeedLoad.fetch({q: data.responseData.url},{}, function (data) {
                    if (data.responseStatus != 200) {
                        $scope.searchLoading = false;
                        alert('failed');
                        return;
                    }

                    $scope.feed.title = data.responseData.feed.title;
                });
                $scope.searchLoading = false;
            });
        };

        $scope.$on('FeedList', function (event, data) {
            $scope.feeds = data;
        });
    });

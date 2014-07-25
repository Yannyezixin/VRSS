angular.module('yann.MiniRSS')
    .controller('ItemCtrl', function ($scope, $routeParams, FeedList, FeedLoad, HashString, CollectList) {
        var feed = FeedList.getById($routeParams.id)
        var list = CollectList.get();
        $scope.collectStatus = '收藏';
        $scope.disabledClick = true;


        FeedLoad.fetch({q: feed.url, num: 50}, {}, function (data) {
            $scope.feed = data.responseData.feed;
            $scope.id = $routeParams.id;
            var entries = data.responseData.feed.entries;

            for (var i = entries.length - 1; i >= 0; i--) {
                if (HashString.perform(entries[i].title) == $routeParams.hashKey) {
                    $scope.item = entries[i];

                for (var j = list.length - 1; j >= 0; j--) {
                    if(list[j].originalUrl == $scope.item.link) {
                        $scope.collectStatus = '已收藏';
                        $scope.disabledClick = true;
                        break;
                    } else {
                        $scope.disabledClick = false;
                    }
                }
                }
            }
        });


        $scope.collect = function () {
            var url = '#/feed/'+$routeParams.id+'/item/'+$routeParams.hashKey;
            CollectList.add(url, $scope.item.title, $scope.feed.title, $scope.item.link);
            $scope.collectStatus = '已收藏';
            $scope.disabledClick = true;
        }
    });

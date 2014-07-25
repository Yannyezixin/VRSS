angular.module('yann.MiniRSS.FeedList', ['yann.LocalObjectStorage'])
    .service('FeedList', function ($rootScope, LocalObjectStorage) {
        this.add = function(url, title) {
            var list = this.get();
            var id = localStorage.getItem('FeedListId') ? localStorage.getItem('FeedListId') : 1;

            list.push({
                url:    url,
                title:  title,
                id:     id
            });

            LocalObjectStorage.setObject('FeedList', list);
            localStorage.setItem('FeedListId', ++id);
            $rootScope.$broadcast('FeedList', list);
        };

        this.delete = function (id) {
            var list = this.get();

            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].id == id) {
                    list.splice(i, 1);
                }
            }

            LocalObjectStorage.setObject('FeedList', list);
            $rootScope.$broadcast('FeedList', list);
        };

        this.get = function () {
            if (LocalObjectStorage.contains('FeedList')) {
                return LocalObjectStorage.getObject('FeedList');
            }

            return new Array({
                url: 'http://youbookee.com/feed.xml',
                title: 'Youbookee',
                id: 0
            });
        };

        this.getById = function(id) {
            var list = this.get();

            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].id == id) {
                    return list[i];
                }
            }

            return null;
        };

        this.getMinId = function () {
            var list = this.get();
            var minId = Number.MAX_VALUE;

            for (var i = list.length - 1; i >= 0; i--) {
                minId = Math.min(minId, list[i].id);
            }

            return minId;
        };
    })
	.service('CollectList', function ($rootScope, LocalObjectStorage) {
        this.add = function(url,articleTitle, title, originalUrl) {
            var list = this.get();
            var id = localStorage.getItem('CollectListId') ? localStorage.getItem('CollectListId') : 1;

            if(id != 1) {
                list.push({
                    url:            url,
                    articleTitle:   articleTitle,
                    title:          title,
                    originalUrl:    originalUrl,
                    id:             id
                });
            } else {
                list = Array({
                    url:            url,
                    articleTitle:   articleTitle,
                    title:          title,
                    originalUrl:    originalUrl,
                    id:             id
                });
            }

            LocalObjectStorage.setObject('CollectList', list);
            localStorage.setItem('CollectListId', ++id);
        };

        this.delete = function (id) {
            var list = this.get();

            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].id == id) {
                    list.splice(i, 1);
                }
            }

            LocalObjectStorage.setObject('CollectList', list);
            $rootScope.$broadcast('CollectList', list);
        };

        this.get = function () {
            if (LocalObjectStorage.contains('CollectList')) {
                return LocalObjectStorage.getObject('CollectList');
            }
        };


    });

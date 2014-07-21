angular.module('yann.MiniRSS.googleapis.feed', ['ngResource'])
    .factory('FeedLoad',function ($resource) {
        return $resource('https://ajax.googleapis.com/ajax/services/feed/load', {}, {
            fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'}}
        });
    })
    .factory('UrlLookup', function ($resource) {
        return $resource('https://ajax.googleapis.com/ajax/services/feed/lookup', {} ,{
            fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'}}
        });
    });

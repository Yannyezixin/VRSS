angular.module('yann.MiniRSS', ['yann.MiniRSS.FeedList','yann.MiniRSS.googleapis.feed','ngRoute','ngSanitize'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',                          {templateUrl: 'views/list.html',        controller: 'ItemsCtrl'})
            .when('/feed/:id',                  {templateUrl: 'views/list.html',        controller: 'ItemsCtrl'})
            .when('/feed/:id/item/:hashKey',    {templateUrl: 'views/item.html',        controller: 'ItemCtrl'})
            .when('/manage',                    {templateUrl: 'views/manage/list.html', controller: 'FeedManageCtrl'})
            .when('/manage/add',                {templateUrl: 'views/manage/add.html',  controller: 'FeedManageCtrl'})
            .when('/collect/',                  {templateUrl: 'views/collect/list.html',controller: 'CollectsCtrl'})

    })
	.config( [
		'$compileProvider',
		function( $compileProvider )
		{
		    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
		    // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
		}
	]);

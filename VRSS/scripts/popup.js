angular.module('vrss', [])
    .controller('vrssCtrl', function ($scope) {
        $scope.buttonNews = 'Loading';
        $scope.loading = false;

        $scope.add = function () {
            $scope.FeedHas = true;
            $scope.loading = true;
            chrome.runtime.sendMessage('Add', function(response) {
                $scope.$apply(function() { $scope.response = response;});
                if (response == 'success') {
                    $scope.$apply(function() {
                        $scope.loading = false;
                        $scope.FeedHas = true;
                        $scope.buttonNews = 'Feed had in VRSS';
                    });
                }
            });
        };
        $scope.option = function () {
            window.open(chrome.extension.getURL("index.html"));
        };
        chrome.runtime.sendMessage('FeedSame', function(response) {
            $scope.$apply(function () {
                if (response == 'hadAdd') {
                    $scope.FeedHas = true;
                    $scope.buttonNews = 'Feed had in VRSS';
                } else if (response == 'NoAdd') {
                    $scope.FeedHas = false;
                    $scope.buttonNews = 'Feed to VRSS';
                } else {
                    $scope.FeedHas = true;
                    $scope.buttonNews = 'No Feed can add';
                }
            });
        });

    });

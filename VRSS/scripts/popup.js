angular.module('vrss', [])
    .controller('vrssCtrl', function ($scope) {
        $scope.add = function () {
            chrome.runtime.sendMessage('Add', function(response) {
                $scope.response = response;
            });
        };
        $scope.option = function () {
            window.open(chrome.extension.getURL("index.html"));
        };

    });

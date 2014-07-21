angular.module('yann.MiniRSS')
    .filter('hash', function (HashString) {
        return function (value) {
            return HashString.perform(value);
        };
    });

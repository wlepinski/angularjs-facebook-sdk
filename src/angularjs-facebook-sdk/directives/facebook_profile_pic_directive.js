function FacebookProfilePicDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<img ng-attr-width ng-attr-height />',
        scope: {
            uid: '@uid',
            type: '@type',
            width: '@width',
            height: '@height'
        },
        compile: function compileFn(tElement, tAttrs) {
            return function linkFn(scope, element) {
                facebookService.ready.then(function () {
                    var pictureUrl = (scope.uid) ? scope.uid + "/picture" : "/me/picture";

                    var apiCall = facebookService.api(pictureUrl, {
                        redirect: false,
                        type: scope.type,
                        width: scope.width,
                        height: scope.height
                    });

                    apiCall.then(function (response) {
                        if (response && !response.error) {
                            element.attr('src', response.data.url);
                        }
                    });
                });
            };
        }
    };
}

FacebookProfilePicDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbProfilePic', FacebookProfilePicDirective);

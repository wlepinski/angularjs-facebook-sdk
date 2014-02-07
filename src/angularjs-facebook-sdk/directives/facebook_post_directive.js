function FacebookPostDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:post ng-attr-href="{{href}}" ng-attr-width="{{width}}"></fb:post>',
        scope: {
            href: '@href',
            width: '@width'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookPostDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbPost', FacebookPostDirective);

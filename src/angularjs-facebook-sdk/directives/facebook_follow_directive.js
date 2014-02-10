function FacebookFollowDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:follow ng-attr-href ng-attr-colorscheme ng-attr-layout ng-attr-show-faces></fb:follow>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            layout: '@layout',
            showFaces: '@showFaces'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookFollowDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbFollow', FacebookFollowDirective);

function FacebookLikeboxDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:like-box ng-attr-href ng-attr-colorscheme ng-attr-show-faces ng-attr-header ng-attr-stream ng-attr-show-border></fb:like-box>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            showFaces: '@showFaces',
            header: '@header',
            stream: '@stream',
            showBorder: '@showBorder'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookLikeboxDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLikeBox', FacebookLikeboxDirective);

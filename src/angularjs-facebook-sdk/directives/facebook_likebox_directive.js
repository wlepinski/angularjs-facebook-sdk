function FacebookLikeboxDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:like-box ng-attr-href="{{href}}" ng-attr-colorscheme="{{colorschema}}" ng-attr-show_faces="{{showFaces}}" ng-attr-header="{{header}}" ng-attr-stream="{{stream}}" ng-attr-show_border="{{showBorder}}"></fb:like-box>',
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

function FacebookLikeDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:like ng-attr-href ng-attr-layout ng-attr-action ng-attr-show-faces ng-attr-share></fb:like>',
        scope: {
            href: '@href',
            layout: '@layout',
            action: '@action',
            show_faces: '@showFaces',
            share: '@share'
        },
        link: function (scope, element, attrs) {
            console.log(element[0]);
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookLikeDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLike', FacebookLikeDirective);

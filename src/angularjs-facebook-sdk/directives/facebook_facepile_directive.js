function FacebookFacepileDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:facepile ng-attr-href ng-attr-action ng-attr-width ng-attr-max-rows ng-attr-colorscheme ng-attr-size ng-attr-show-count></fb:facepile>',
        scope: {
            href: '@href',
            action: '@action',
            colorschema: '@colorschema',
            showCount: '@showCount',
            height: '@height',
            width: '@width',
            maxRows: '@maxRows',
            size: '@size'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookFacepileDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbFacepile', FacebookFacepileDirective);

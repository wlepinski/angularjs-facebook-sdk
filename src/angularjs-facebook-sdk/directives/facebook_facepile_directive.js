function FacebookFacepileDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:facepile ng-attr-href="{{href}}" ng-attr-width="{{width}}" ng-attr-max_rows="{{maxRows}}" ng-attr-colorscheme="{{colorschema}}" ng-attr-size="{{size}}" ng-attr-show_count="{{showCount}}"></fb:facepile>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            showCount: '@showCount',
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

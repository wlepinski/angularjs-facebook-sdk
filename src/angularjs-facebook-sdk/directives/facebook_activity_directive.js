function FacebookActivityDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:activity ng-attr-app-id ng-attr-site ng-attr-action ng-attr-colorscheme ng-attr-header></fb:activity>',
        scope: {
            appId: '@appId',
            site: '@site',
            action: '@action',
            colorschema: '@colorschema',
            header: '@header'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookActivityDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbActivity', FacebookActivityDirective);

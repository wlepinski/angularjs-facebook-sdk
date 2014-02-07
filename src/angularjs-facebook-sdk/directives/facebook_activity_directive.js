function FacebookActivityDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:activity ng-attr-app_id="{{appId}}" ng-attr-site="{{site}}" ng-attr-action="{{action}}" ng-attr-colorscheme="{{colorschema}}" ng-attr-header="{{header}}"></fb:activity>',
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

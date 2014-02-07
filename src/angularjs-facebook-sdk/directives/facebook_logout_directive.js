function FacebookLogoutDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<button ng-click="dispatchLogout();">{{label}}</button>',
        scope: {
            label: '@label'
        },
        link: function (scope, element) {
            scope.dispatchLogout = function dispatchLogin() {
                facebookService.logout();
            };
        }
    };
}

FacebookLogoutDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLogout', FacebookLogoutDirective);

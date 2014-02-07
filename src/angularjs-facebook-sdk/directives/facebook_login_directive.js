function FacebookLoginDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<button ng-click="dispatchLogin();">{{label}}</button>',
        scope: {
            label: '@label',
            scope: '@scope',
            enableProfileSelector: '@enableProfileSelector',
            profileSelectorIds: '@profileSelectorIds'
        },
        compile: function (tElement, tAttrs) {
            var loginOpts = {};

            if (tAttrs.scope) {
                loginOpts.scope = tAttrs.scope;
            }
            if (tAttrs.enableProfileSelector) {
                loginOpts.enable_profile_selector = true;
            }
            if (tAttrs.profileSelectorIds) {
                loginOpts.profile_selector_ids = true;
            }

            return function linkFn(scope, element) {
                scope.dispatchLogin = function dispatchLogin() {
                    facebookService.login(loginOpts);
                };
            };
        }
    };
}

FacebookLoginDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLogin', FacebookLoginDirective);

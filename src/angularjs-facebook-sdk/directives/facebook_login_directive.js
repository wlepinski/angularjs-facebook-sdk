function FacebookLoginDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<button ng-click="dispatchLogin();">{{label}}</button>',
    scope: {
      label: '@label'
    },
    link: function (scope, element) {
      /**
       * [dispatchLogin description]
       *
       * @return {[type]} [description]
       */
      scope.dispatchLogin = function dispatchLogin () {
        facebookService.login();
      };
    }
  };
}

FacebookLoginDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbLogin', FacebookLoginDirective);

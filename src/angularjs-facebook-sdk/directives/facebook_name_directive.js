function FacebookNameDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:name ng-attr-uid="{{uid}}"></fb:name>',
    scope: {
        uid: '@uid'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookNameDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbName', FacebookNameDirective);

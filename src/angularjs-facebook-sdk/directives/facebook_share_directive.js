function FacebookShareDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:share-button ng-attr-href="{{href}}" ng-attr-type="{{type}}"></fb:share-button>',
    scope: {
        href: '@href',
        type: '@type'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookShareDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbShareButton', FacebookShareDirective);

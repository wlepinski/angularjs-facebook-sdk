function FacebookLikeDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:like ng-attr-href="{{href}}" ng-attr-layout="{{layout}}" ng-attr-action="{{action}}" ng-attr-show_faces="{{show_faces}}" ng-attr-share="{{share}}"></fb:like>',
    scope: {
        href: '@href',
        layout: '@layout',
        action: '@action',
        show_faces: '@showFaces',
        share: '@share'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookLikeDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbLike', FacebookLikeDirective);

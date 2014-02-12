function FacebookLikeDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:like ng-attr-href ng-attr-layout ng-attr-action ng-attr-show-faces ng-attr-share></fb:like>',
        scope: {
            href: '@href',
            layout: '@layout',
            action: '@action',
            show_faces: '@showFaces',
            share: '@share',
            // Events
            edgeCreated: '&onEdgeCreated',
            edgeRemoved: '&onEdgeRemoved'
        },
        link: function (scope, element, attrs) {
            function edgeCreatedHandler(url, htmlElement) {
                if (htmlElement === element[0]) {
                    // Call the scope event if the htmlElement match
                    scope.edgeCreated({url: url});
                }
            }

            function edgeRemovedHandler(url, htmlElement) {
                if (htmlElement === element[0]) {
                    // Call the scope event if the htmlElement match
                    scope.edgeRemoved({url: url});
                }
            }

            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
                facebookService.Event.subscribe('edge.create', edgeCreatedHandler);
                facebookService.Event.subscribe('edge.remove', edgeRemovedHandler);
            });

            // Listen for scope removal and unsubscribe some previously added events.
            scope.$on('$destroy', function () {
                facebookService.Event.unsubscribe('edge.create', edgeCreatedHandler);
                facebookService.Event.unsubscribe('edge.remove', edgeRemovedHandler);
            });
        }
    };
}

FacebookLikeDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLike', FacebookLikeDirective);

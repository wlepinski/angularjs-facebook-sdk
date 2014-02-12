function FacebookCommentsDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:comments ng-attr-href ng-attr-numposts ng-attr-colorscheme></fb:comments>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            numposts: '@numposts',
            // Events
            commentCreated: '&onCommentCreated',
            commentRemoved: '&onCommentRemoved'
        },
        link: function (scope, element) {
            function commentCreatedHandler(data) {
                if (data.href === scope.href) {
                    // Call the scope event if the htmlElement match
                    scope.commentCreated(data);
                }
            }

            function commentRemovedHandler(data) {
                if (data.href === scope.href) {
                    // Call the scope event if the htmlElement match
                    scope.commentRemoved(data);
                }
            }

            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);

                facebookService.Event.subscribe('comment.create', commentCreatedHandler);
                facebookService.Event.subscribe('comment.remove', commentRemovedHandler);
            });

            // Listen for scope removal and unsubscribe some previously added events.
            scope.$on('$destroy', function () {
                facebookService.Event.unsubscribe('comment.create', commentCreatedHandler);
                facebookService.Event.unsubscribe('comment.remove', commentRemovedHandler);
            });
        }
    };
}

FacebookCommentsDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbComments', FacebookCommentsDirective);

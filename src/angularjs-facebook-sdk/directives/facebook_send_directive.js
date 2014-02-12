function FacebookSendDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:send ng-attr-href ng-attr-color-schema ng-attr-width ng-attr-height></fb:send>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            width: '@width',
            height: '@height',
            // Events
            messageSend: '@onMessageSend'
        },
        link: function (scope, element) {
            function messageSendHandler(url) {
                if (url === scope.href) {
                    // Call the scope event if the htmlElement match
                    scope.messageSend({ url: url });
                }
            }

            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
                facebookService.Event.subscribe('message.send', messageSendHandler);
            });

            scope.$on('$destroy', function () {
                facebookService.Event.unsubscribe('message.send', messageSendHandler);
            });
        }
    };
}

FacebookSendDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbSend', FacebookSendDirective);

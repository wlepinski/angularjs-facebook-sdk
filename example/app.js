angular.module('app', ['angularjs-facebook-sdk', 'ngRoute'])
    .config(function facebookConfig(facebookConfigProvider, $routeProvider) {
        facebookConfigProvider.setAppId(394254447322921);
        facebookConfigProvider.setOptions({ status: false });
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'ComponentsController'
        })
    })
    .run(function (facebookConfig, facebookService) {
        facebookService.ready.then(function () {
            console.log('Facebook is ready!');

            var statusChangeHandler = function (response) {
                if (response.status === 'connected') {
                    facebookService.api('/me').then(function (response) {
                        console.log(response);
                    });
                }
            };

            facebookService.Event.subscribe('auth.statusChange', statusChangeHandler);
        });
    })
    .filter('log', function() {
        return function () {
            console.log(arguments);
        }
    })
    .controller('ComponentsController', function ($scope, facebookService) {
        $scope.onEdgeCreated = function onEdgeCreated (url) {
            console.log('onEdgeCreated', arguments);
        }

        $scope.onEdgeRemoved = function onEdgeRemoved (url) {
            console.log('onEdgeRemoved', arguments);
        }

        $scope.onCommentCreated = function onCommentCreated (href, commentID, parentCommentID) {
            console.log('onCommentCreated', arguments);
        }

        $scope.onCommentRemoved = function onCommentRemoved (href, commentID, parentCommentID) {
            console.log('onCommentRemoved', arguments);
        }

        facebookService.ready.then(function(){
            FB.Event.subscribe('message.send', function messageSend (argument) {
                console.log(arguments);
            });
        })

        $scope.onMessageSend = function onMessageSend (url) {
            console.log('onMessageSend', arguments);
        }
    })
    .directive('component', function ($compile, $sce) {
        return {
            restrict: 'E',
            templateUrl: 'component.tpl',
            transclude: true,
            scope: {
                name: '@name'
            },
            compile: function compileFn (tElement, tAttrs, transcludeFn) {
                return function linkFn (scope, element) {
                    scope.component = {};

                    transcludeFn(scope, function (clonedElement, scope) {
                        var componentDeclaration = clonedElement.find('component\\:declaration').html();
                        var componentDocumentation = clonedElement.find('component\\:documentation');

                        if (componentDocumentation.length > 0) {
                            scope.documentation = componentDocumentation.attr('url');
                        }

                        // Result
                        var result = $compile(componentDeclaration)(scope.$parent);
                        element.find('.result').append(result);

                        // Usage
                        scope.component.usage = $sce.trustAsHtml(hljs.highlight('html', componentDeclaration.trim()).value);
                    });
                }
            }
        };
    });

angular.module('app', ['angularjs-facebook-sdk'])
    .config(function facebookConfig(facebookConfigProvider) {
        facebookConfigProvider.setAppId(394254447322921);
        facebookConfigProvider.setOptions({ status: false });
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
                        var result = $compile(componentDeclaration)(scope);
                        element.find('.result').append(result);

                        // Usage
                        scope.component.usage = $sce.trustAsHtml(hljs.highlight('html', componentDeclaration.trim()).value);
                    });
                }
            }
        };
    });

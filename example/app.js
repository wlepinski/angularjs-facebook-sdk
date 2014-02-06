angular.module('app', ['angularjs-facebook-sdk'])
    .config(function facebookConfig(facebookConfigProvider) {
        facebookConfigProvider.setAppId(394254447322921);
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

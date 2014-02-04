angular.module('app', ['angularjs-facebook-sdk'])
  .config(function facebookConfig (facebookConfigProvider) {
    facebookConfigProvider.setAppId(394254447322921);
  })
  .run(function (facebookConfig, facebookService) {
    facebookConfig.init();
    facebookService.ready.then(function() {
      console.log('Facebook is ready!', FB);
      facebookService.eventEmitter.$on('login', function () {
        console.log('test');
      });
    });
  });
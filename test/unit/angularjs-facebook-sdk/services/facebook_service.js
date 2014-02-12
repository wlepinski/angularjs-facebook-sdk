describe('FacebookService', function () {
  var _facebookService;
  var _$q;

  //excuted before each "it" is run.
  beforeEach(function () {
    // Initialize the service provider by injecting it to a fake module's config block
    angular.module('testApp', function () {})
      .config(function (facebookConfigProvider) {
        facebookConfigProvider.setAppId(12345);
      });

    //load the module.
    module('angularjs-facebook-sdk', 'testApp');

    //inject your service for testing.
    inject(function (facebookService, $q) {
      _facebookService = facebookService;
      _$q = $q;
    });
  });

  it('should export the correct api', function () {
    expect(_facebookService.ready).not.toBe(null);
    expect(_facebookService.api).toEqual(jasmine.any(Function));
    expect(_facebookService.ui).toEqual(jasmine.any(Function));
    expect(_facebookService.login).toEqual(jasmine.any(Function));
    expect(_facebookService.logout).toEqual(jasmine.any(Function));
    expect(_facebookService.getLoginStatus).toEqual(jasmine.any(Function));
  });

  it('should return a promise on the api method', function () {
    expect(_facebookService.api().then).toBeDefined();
  })
});1

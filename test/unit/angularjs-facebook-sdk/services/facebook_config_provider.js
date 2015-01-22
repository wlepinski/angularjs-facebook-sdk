describe('FacebookConfigProvider', function () {

    var _facebookConfigProvider;

    beforeEach(function () {
      // Initialize the service provider by injecting it to a fake module's config block
      angular.module('testApp', function () {})
        .config(function (facebookConfigProvider) {
          _facebookConfigProvider = facebookConfigProvider;
        });

      // Initialize myApp injector
      module('angularjs-facebook-sdk', 'testApp');

      // Kickstart the injectors previously registered with calls to angular.mock.module
      inject(function () {});
    });

    describe('with custom configuration', function () {
      it('tests the providers internal function', inject(function ($injector) {
        // check sanity
        expect(_facebookConfigProvider).not.toBeUndefined();

        // configure the provider
        _facebookConfigProvider.setAppId('12345');
        _facebookConfigProvider.setSdkVersion('v2.2');
        _facebookConfigProvider.setDebug(true);
        _facebookConfigProvider.setLanguage('pt_BR');

        // Invoke the provider factory function
        var instance = $injector.invoke(_facebookConfigProvider.$get);

        // test an instance of the provider for
        // the custom configuration changes
        expect(instance.appId).toBe('12345');
        expect(instance.sdkVersion).toBe('v2.2');
        expect(instance.debug).toBe(true);
        expect(instance.lang).toBe('pt_BR');
      }));

      it('test setting of sdkVersion from user options', inject(function ($injector) {
        _facebookConfigProvider.setOptions({ version: 'v1.0' });

        // Invoke the provider factory function
        var instance = $injector.invoke(_facebookConfigProvider.$get);

        expect(instance.sdkVersion).toBe('v1.0');
      }));

      it('should initialize the SDK', inject(function ($injector) {
        _facebookConfigProvider.setAppId(1111);
        _facebookConfigProvider.setLanguage('pt_BR');

        // Invoke the provider factory function
        var instance = $injector.invoke(_facebookConfigProvider.$get);

        runs(function() {
          var promise = instance.init();
          expect(promise.then).toEqual(jasmine.any(Function));
        });

        waitsFor(function() {
          return window.FB != undefined
        }, "FB should be defined");

        runs(function() {
          expect(FB).not.toBe(undefined);
          expect(instance.lang).toBe('pt_BR');
          // expect(document.getElementsByTagName('script')[0].src).toContain('facebook');
          // expect(document.getElementsByTagName('script')[0].src).toBe('http://connect.facebook.net/pt_BR/all.js');
        });
      }));
    });

});

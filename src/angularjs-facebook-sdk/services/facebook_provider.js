angular.module('angularjs-facebook-sdk.services')
  .provider('facebook', function () {
    var _appId = null;
    var _langCode = 'en_US';
    var _debug = false;

    /**
     * Set the Facebook SDK application ID.
     *
     * @param {Number} appId The application ID.
     */
    this.setAppId = function setAppId (appId) {
      _appId = appId;
    };

    /**
     * Set the language of the framework.
     * By default the en_US is used.
     *
     * @param {String} langCode The language code.
     */
    this.setLanguage = function setLanguage (langCode) {
      _langCode = langCode;
    }

    /**
     * Enable/Disable the debug for Facebook SDK.
     *
     * @param {Boolean} enableDebug Wheather to enable or disable the debug.
     */
    this.setDebug = function setDebug (enableDebug) {
      _debug = enableDebug;
    }

    /**
     * [FacebookProviderFactoryFn description]
     */
    function FacebookProviderFactoryFn ($window, $q) {
      var initDefer = $q.defer();

      $window.fbAsyncInit = function fbAsyncInit () {
        initDefer.resolve();

        FB.init({
          appId      : _appId,
          status     : true,
          xfbml      : true
        });
      }

      // The public API
      return {
        appId: _appId,
        lang: _langCode,
        debug: _debug,

        /**
         * Initialize the Facebook SDK for Javsacript.
         * This will load the SDK using the configuration passed to the provider.
         *
         * @return {Promise} The initialize Promise instance.
         */
        init: function () {
          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/" + _langCode + (_debug ? "/all/debug.js" : "/all.js");
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));

          return initDefer.promise;
        }
      };
    }

    FacebookProviderFactoryFn.$inject = ['$window', '$q'];

    this.$get = FacebookProviderFactoryFn;
  });

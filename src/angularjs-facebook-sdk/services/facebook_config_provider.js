angular.module('angularjs-facebook-sdk.services')
    .provider('facebookConfig', function () {
        var _appId = null;
        var _userOptions = {};
        var _langCode = 'en_US';
        var _debug = false;
        var _autoInit = true;

        /**
         * Set the Facebook SDK application ID.
         *
         * @param {Number} appId The application ID.
         */
        this.setAppId = function setAppId(appId) {
            _appId = appId;
        };

        /**
         * Set the language of the framework.
         * By default the en_US is used.
         *
         * @param {String} langCode The language code.
         */
        this.setLanguage = function setLanguage(langCode) {
            _langCode = langCode;
        };

        /**
         * Enable/Disable the debug for Facebook SDK.
         *
         * @param {Boolean} enableDebug Wheather to enable or disable the debug.
         */
        this.setDebug = function setDebug(enableDebug) {
            _debug = enableDebug;
        };

        /**
         * [setOptions description]
         *
         * @param {[type]} options [description]
         */
        this.setOptions = function setOptions(options) {
            _userOptions = options;
        };


        /**
         * Enable/Disable the automatic initialization.
         *
         * @param  {Boolean} enableAutoInit Wheather to enable/disable the auto initialization.
         */
        this.autoInit = function autoInit(enableAutoInit) {
            _autoInit = enableAutoInit;
        };

        /**
         * [FacebookProviderFactoryFn description]
         */
        function FacebookProviderFactoryFn($rootScope, $window, $q) {
            var defaultOptions = {
                appId: _appId,
                status: true,
                xfbml: true
            };

            var initDefer = $q.defer();
            var initOpts = angular.extend(defaultOptions, _userOptions);

            /**
             * Hook up a method on the window object. This way we can be notified
             * when the Facebook SDK is ready to be used.
             *
             * The initDefer promise is resolved inside this method.
             *
             * @return {[type]} [description]
             */
            $window.fbAsyncInit = function fbAsyncInit() {
                FB.init(initOpts);

                $rootScope.$apply(function () {
                    initDefer.resolve();
                });
            };

            // The public API
            return {
                appId: _appId,
                lang: _langCode,
                debug: _debug,
                autoInit: _autoInit,

                // The initialization promise
                initialization: initDefer.promise,

                /**
                 * Initialize the Facebook SDK for Javascript.
                 * This will load the SDK using the configuration passed to the provider.
                 *
                 * @return {Promise} The initialize Promise instance.
                 */
                init: function () {
                    (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/" + _langCode + (_debug ? "/all/debug.js" : "/all.js");
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));

                    return initDefer.promise;
                }
            };
        }

        FacebookProviderFactoryFn.$inject = ['$rootScope', '$window', '$q'];

        this.$get = FacebookProviderFactoryFn;
    });

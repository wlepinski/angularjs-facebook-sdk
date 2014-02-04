(function(window, document) {

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('angularjs-facebook-sdk.config', [])
    .value('angularjs-facebook-sdk.config', {
        debug: true
    });

// Modules
angular.module('angularjs-facebook-sdk.directives', []);
angular.module('angularjs-facebook-sdk.services', []);
angular.module('angularjs-facebook-sdk', [
    'angularjs-facebook-sdk.config',
    'angularjs-facebook-sdk.directives',
    'angularjs-facebook-sdk.services'
]);
function FacebookActivityDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:activity ng-attr-app_id="{{appId}}" ng-attr-site="{{site}}" ng-attr-action="{{action}}" ng-attr-colorscheme="{{colorschema}}" ng-attr-header="{{header}}"></fb:activity>',
    scope: {
        appId: '@appId',
        site: '@site',
        action: '@action',
        colorschema: '@colorschema',
        header: '@header'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookActivityDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbActivity', FacebookActivityDirective);
function FacebookCommentsDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:comments ng-attr-href="{{href}}" ng-attr-numposts="{{numposts}}" ng-attr-colorscheme="{{colorschema}}"></fb:comments>',
    scope: {
        href: '@href',
        colorschema: '@colorschema',
        numposts: '@numposts'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookCommentsDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbComments', FacebookCommentsDirective);
function FacebookFacepileDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:facepile ng-attr-href="{{href}}" ng-attr-width="{{width}}" ng-attr-max_rows="{{maxRows}}" ng-attr-colorscheme="{{colorschema}}" ng-attr-size="{{size}}" ng-attr-show_count="{{showCount}}"></fb:facepile>',
    scope: {
        href: '@href',
        colorschema: '@colorschema',
        showCount: '@showCount',
        width: '@width',
        maxRows: '@maxRows',
        size: '@size'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookFacepileDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbFacepile', FacebookFacepileDirective);
function FacebookFollowDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:follow ng-attr-href="{{href}}" ng-attr-colorscheme="{{colorschema}}" ng-attr-layout="{{layout}}" ng-attr-show-faces="{{showFaces}}"></fb:follow>',
    scope: {
        href: '@href',
        colorschema: '@colorschema',
        layout: '@layout',
        showFaces: '@showFaces'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookFollowDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbFollow', FacebookFollowDirective);
function FacebookLikeDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:like ng-attr-href="{{href}}" ng-attr-layout="{{layout}}" ng-attr-action="{{action}}" ng-attr-show_faces="{{show_faces}}" ng-attr-share="{{share}}"></fb:like>',
    scope: {
        href: '@href',
        layout: '@layout',
        action: '@action',
        show_faces: '@showFaces',
        share: '@share'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookLikeDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbLike', FacebookLikeDirective);
function FacebookLikeboxDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:like-box ng-attr-href="{{href}}" ng-attr-colorscheme="{{colorschema}}" ng-attr-show_faces="{{showFaces}}" ng-attr-header="{{header}}" ng-attr-stream="{{stream}}" ng-attr-show_border="{{showBorder}}"></fb:like-box>',
    scope: {
        href: '@href',
        colorschema: '@colorschema',
        showFaces: '@showFaces',
        header: '@header',
        stream: '@stream',
        showBorder: '@showBorder'

    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookLikeboxDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbLikeBox', FacebookLikeboxDirective);
function FacebookLoginDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<button ng-click="dispatchLogin();">{{label}}</button>',
    scope: {
      label: '@label'
    },
    link: function (scope, element) {
      /**
       * [dispatchLogin description]
       *
       * @return {[type]} [description]
       */
      scope.dispatchLogin = function dispatchLogin () {
        facebookService.login();
      };
    }
  };
}

FacebookLoginDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbLogin', FacebookLoginDirective);
function FacebookLogoutDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<button ng-click="dispatchLogout();">{{label}}</button>',
    scope: {
      label: '@label'
    },
    link: function (scope, element) {
      scope.dispatchLogout = function dispatchLogin () {
        facebookService.logout();
      };
    }
  };
}

FacebookLogoutDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbLogout', FacebookLogoutDirective);
function FacebookPostDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:post ng-attr-href="{{href}}" ng-attr-width="{{width}}"></fb:post>',
    scope: {
        href: '@href',
        width: '@width'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookPostDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbPost', FacebookPostDirective);
function FacebookShareDirective (facebookService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<fb:share-button ng-attr-href="{{href}}" ng-attr-type="{{type}}"></fb:share-button>',
    scope: {
        href: '@href',
        type: '@type'
    },
    link: function (scope, element) {
        facebookService.ready.then(function(){
            FB.XFBML.parse(element[0]);
        });
    }
  };
}

FacebookShareDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
  .directive('afbShareButton', FacebookShareDirective);
angular.module('angularjs-facebook-sdk.services')
  .provider('facebookConfig', function () {
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
    };

    /**
     * Enable/Disable the debug for Facebook SDK.
     *
     * @param {Boolean} enableDebug Wheather to enable or disable the debug.
     */
    this.setDebug = function setDebug (enableDebug) {
      _debug = enableDebug;
    };

    /**
     * [FacebookProviderFactoryFn description]
     */
    function FacebookProviderFactoryFn ($rootScope, $window, $q) {
      var initDefer = $q.defer();

      $window.fbAsyncInit = function fbAsyncInit () {
        FB.init({
          appId      : _appId,
          status     : true,
          xfbml      : true
        });

        $rootScope.$apply(function(){
            initDefer.resolve();
        });
      };

      // The public API
      return {
        appId: _appId,
        lang: _langCode,
        debug: _debug,

        // The initialization promise
        initialization: initDefer.promise,

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

    FacebookProviderFactoryFn.$inject = ['$rootScope', '$window', '$q'];

    this.$get = FacebookProviderFactoryFn;
  });
function FacebookService(facebookConfig, $q, $rootScope) {
  var eventEmitter = $rootScope.$new();

  return {
    ready: facebookConfig.initialization,

    /**
     * This is the event emitter
     *
     * @type {[type]}
     */
    eventEmitter: eventEmitter,

    /**
     * This method lets you make calls to the Graph API.
     *
     * @param  {string}   path
     * This is the Graph API endpoint path that you want to call.
     * You can read the Graph API reference docs to see which endpoint you want to use.
     * This is a required parameter.
     *
     * @param  {enum{get, post, delete}}   method
     * This is the HTTP method that you want to use for the API request.
     * Consult the Graph API reference docs to see which method you need to use.
     * Default is get
     *
     * @param  {object}   params
     * This is an object consisting of any parameters that you want to pass into your Graph API call.
     * The parameters that can be used vary depending on the endpoint being called, so check the
     * Graph API reference docs for full lists of available parameters. One parameter of note is
     * access_token which you can use to make an API call with a Page access token.
     * App access tokens should never be used in this SDK as it is client-side, and your app secret would be exposed.
     *
     * @param  {Function} callback
     * This is the function that is triggered whenever the API returns a response.
     * The response object available to this function contains the API result.
     *
     * @return {Promise}
     */
    api: function (path, method, params) {
      var defer = $q.defer();

      this.ready.then(function () {
        console.log('test');
      });

      return defer.promise;
    },

    /**
     * This method is used to trigger different forms of Facebook created UI dialogs.
     *
     * @param  {[type]} params
     * A collection of parameters that control which dialog is loaded, and relevant settings. Click for more info.
     *
     * @return {Promise}
     */
    ui: function (params) {},

    /**
     * Calling FB.login prompts the user to authenticate your application using the OAuth Dialog.
     *
     * Calling FB.login results in the JS SDK attempting to open a popup window. As such, this method should only
     * be called after a user click event, otherwise the popup window will be blocked by most browsers.
     *
     * On Canvas, if the user is 'unknown' (that is, when the login status == 'unknown'), do not use the JS SDK
     * to sign in the user, instead do a full redirect of the page to the oauth dialog so that we get a consistent state.
     *
     * @return {Promise}
     */
    login: function () {
      var defer = $q.defer();

      this.ready.then(function () {
        FB.login(function () {
          eventEmitter.$broadcast('login');
          defer.resolve.apply(this, arguments);
        });
      });

      return defer.promise;
    },

    /**
     * Log the user out of your site and Facebook
     *
     * @return {Promise}
     */
    logout: function () {
      var defer = $q.defer();

      this.ready.then(function () {
        FB.logout(function () {
          eventEmitter.$broadcast('logout');
          defer.resolve.apply(this, arguments);
        });
      });

      return defer.promise;
    },

    /**
     * Synchronous accessor for the current authResponse. The synchronous nature of this method is what sets
     * it apart from the other login methods.
     * This method is similar in nature to FB.getLoginStatus, but it returns just the authResponse object.
     * Many parts of your application already assume the user is connected with your application.
     * In such cases, you may want to avoid the overhead of making asynchronous calls.
     *
     * @return {object} the current authResponse object if available, null otherwise
     */
    getAuthResponse: function () {},

    /**
     * FB.getLoginStatus allows you to determine if a user is logged in to Facebook and has authenticated your app.
     *
     * There are three possible states for a user:
     * - the user is logged into Facebook and has authenticated your application (connected)
     * - the user is logged into Facebook but has not authenticated your application (not_authorized)
     * - the user is not logged into Facebook at this time and so we don't know if they've authenticated your
     *   application or not (unknown)
     * - With social application, knowing which of the these three states the user is in is one of the
     *   first things your application needs to know upon page load.
     *
     * Reponse example:
     * {
     *   status: 'connected',
     *   authResponse: {
     *     accessToken: '...',
     *     expiresIn:'...',
     *     signedRequest:'...',
     *     userID:'...'
     *   }
     * }
     *
     * @return {Promise}
     */
    getLoginStatus: function () {}
  };
}

FacebookService.$inject = ['facebookConfig', '$q', '$rootScope'];

angular.module('angularjs-facebook-sdk.services')
  .factory('facebookService', FacebookService);})(window, document);

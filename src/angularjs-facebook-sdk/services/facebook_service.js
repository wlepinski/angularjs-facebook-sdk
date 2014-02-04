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
  .factory('facebookService', FacebookService);
function FacebookService(facebookConfig, $q, $rootScope) {
    var eventEmitter = $rootScope.$new();

    return {
        ready: facebookConfig.initialization,

        Event: {
            /**
             * FB.Event.subscribe allows you to define callbacks that will be called when
             * certain events take place on your site. These events include:
             *
             *     - Logging in or logging out via Facebook Login
             *     - Someone likes or unlikes a page via an embedded like button
             *     - Rendering of social plugins
             *     - Comments are added or removed
             *     - Someone sending a message to your page or a friend via an embedded send button
             *
             * This method is a wrapper for the original event subscriber. We need to wrap the callback
             * call in a Scope.prototype.$apply method to let AngularJS know when it need to update bindings,
             * dispatch other promises among other things.
             *
             * @param  {String} eventName The event name.
             * @return {Promise}
             */
            subscribe: function (eventName, callback) {
                var eventHandler = function () {
                    var args = Array.prototype.slice.call(arguments, 0);

                    $rootScope.$apply(function () {
                        callback.apply(null, args);
                    });
                };

                // Here we store a reference to the wrapped method so that we can unsubscribe the function correctly.
                callback.$$eventHandler = eventHandler;

                // Delegate the subscription to Facebook SDK
                FB.Event.subscribe(eventName, eventHandler);
            },

            /**
             * Removes handlers on events so that it no longer invokes your callback when the event fires.
             *
             * @return {[type]} [description]
             */
            unsubscribe: function (eventName, callback) {
                FB.Event.unsubscribe(eventName, callback.$$eventHandler);
            }
        },

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
            var args = Array.prototype.slice.call(arguments, 0);
            var defer = $q.defer();

            this.ready.then(function () {
                args.push(function apiCallback(response) {
                    // We need to use $apply here because the FB.api callback
                    // is outside the AngularJS kingdom. So we're telling it to
                    // dispatch the deferred resolution ASAP.
                    $rootScope.$apply(function () {
                        defer.resolve(response);
                    });
                });

                // Where we delegate the call to the FB.api method.
                FB.api.apply(null, args);
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
        ui: function (params) {
            var args = Array.prototype.slice.call(arguments, 0);
            var defer = $q.defer();

            this.ready.then(function () {
                args.push(function apiCallback(response) {
                    // We need to use $apply here because the FB.api callback
                    // is outside the AngularJS kingdom. So we're telling it to
                    // dispatch the deferred resolution ASAP.
                    $rootScope.$apply(function () {
                        defer.resolve(response);
                    });
                });

                // Where we delegate the call to the FB.api method.
                FB.ui.apply(null, args);
            });

            return defer.promise;
        },

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
        login: function (opts) {
            opts = opts || {};

            var defer = $q.defer();

            this.ready.then(function () {
                FB.login(function () {
                    var loginArgs = arguments;
                    $rootScope.$apply(function () {
                        defer.resolve.apply(this, loginArgs);
                    });
                }, opts);
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
                    defer.resolve.apply(this, arguments);
                });
            });

            return defer.promise;
        },

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
        getLoginStatus: function () {
            var defer = $q.defer();

            this.ready.then(function () {
                FB.getLoginStatus(function () {
                    defer.resolve.apply(this, arguments);
                });
            });

            return defer.promise;
        }
    };
}

FacebookService.$inject = ['facebookConfig', '$q', '$rootScope'];

angular.module('angularjs-facebook-sdk.services')
    .factory('facebookService', FacebookService);

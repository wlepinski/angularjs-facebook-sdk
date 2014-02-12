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

angular.module('angularjs-facebook-sdk').run(['facebookConfig',
    function (facebookConfig) {
        if (facebookConfig.autoInit) {
            facebookConfig.init();
        }
    }
]);
function FacebookActivityDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:activity ng-attr-app-id ng-attr-site ng-attr-action ng-attr-colorscheme ng-attr-header></fb:activity>',
        scope: {
            appId: '@appId',
            site: '@site',
            action: '@action',
            colorschema: '@colorschema',
            header: '@header'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookActivityDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbActivity', FacebookActivityDirective);
function FacebookCommentsDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:comments ng-attr-href ng-attr-numposts ng-attr-colorscheme></fb:comments>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            numposts: '@numposts',
            // Events
            commentCreated: '&onCommentCreated',
            commentRemoved: '&onCommentRemoved'
        },
        link: function (scope, element) {
            function commentCreatedHandler(data) {
                if (data.href === scope.href) {
                    // Call the scope event if the htmlElement match
                    scope.commentCreated(data);
                }
            }

            function commentRemovedHandler(data) {
                if (data.href === scope.href) {
                    // Call the scope event if the htmlElement match
                    scope.commentRemoved(data);
                }
            }

            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);

                facebookService.Event.subscribe('comment.create', commentCreatedHandler);
                facebookService.Event.subscribe('comment.remove', commentRemovedHandler);
            });

            // Listen for scope removal and unsubscribe some previously added events.
            scope.$on('$destroy', function () {
                facebookService.Event.unsubscribe('comment.create', commentCreatedHandler);
                facebookService.Event.unsubscribe('comment.remove', commentRemovedHandler);
            });
        }
    };
}

FacebookCommentsDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbComments', FacebookCommentsDirective);
function FacebookFacepileDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:facepile ng-attr-href ng-attr-action ng-attr-width ng-attr-max-rows ng-attr-colorscheme ng-attr-size ng-attr-show-count></fb:facepile>',
        scope: {
            href: '@href',
            action: '@action',
            colorschema: '@colorschema',
            showCount: '@showCount',
            height: '@height',
            width: '@width',
            maxRows: '@maxRows',
            size: '@size'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookFacepileDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbFacepile', FacebookFacepileDirective);
function FacebookFollowDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:follow ng-attr-href ng-attr-colorscheme ng-attr-layout ng-attr-show-faces></fb:follow>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            layout: '@layout',
            showFaces: '@showFaces'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookFollowDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbFollow', FacebookFollowDirective);
function FacebookLikeDirective(facebookService, $parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:like ng-attr-href ng-attr-layout ng-attr-action ng-attr-show-faces ng-attr-share></fb:like>',
        scope: {
            href: '@href',
            layout: '@layout',
            action: '@action',
            show_faces: '@showFaces',
            share: '@share',
            // Events
            edgeCreated: '&onEdgeCreated',
            edgeRemoved: '&onEdgeRemoved'
        },
        link: function (scope, element, attrs) {
            function edgeCreatedHandler(url, htmlElement) {
                if (htmlElement === element[0]) {
                    // Call the scope event if the htmlElement match
                    scope.edgeCreated({url: url});
                }
            }

            function edgeRemovedHandler(url, htmlElement) {
                if (htmlElement === element[0]) {
                    // Call the scope event if the htmlElement match
                    scope.edgeRemoved({url: url});
                }
            }

            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
                facebookService.Event.subscribe('edge.create', edgeCreatedHandler);
                facebookService.Event.subscribe('edge.remove', edgeRemovedHandler);
            });

            // Listen for scope removal and unsubscribe some previously added events.
            scope.$on('$destroy', function () {
                facebookService.Event.unsubscribe('edge.create', edgeCreatedHandler);
                facebookService.Event.unsubscribe('edge.remove', edgeRemovedHandler);
            });
        }
    };
}

FacebookLikeDirective.$inject = ['facebookService', '$parse'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLike', FacebookLikeDirective);
function FacebookLikeboxDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:like-box ng-attr-href ng-attr-colorscheme ng-attr-show-faces ng-attr-header ng-attr-stream ng-attr-show-border></fb:like-box>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            showFaces: '@showFaces',
            header: '@header',
            stream: '@stream',
            showBorder: '@showBorder'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookLikeboxDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLikeBox', FacebookLikeboxDirective);
function FacebookLoginDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<button ng-click="dispatchLogin();">{{label}}</button>',
        scope: {
            label: '@label',
            scope: '@scope',
            enableProfileSelector: '@enableProfileSelector',
            profileSelectorIds: '@profileSelectorIds'
        },
        compile: function (tElement, tAttrs) {
            var loginOpts = {};

            if (tAttrs.scope) {
                loginOpts.scope = tAttrs.scope;
            }
            if (tAttrs.enableProfileSelector) {
                loginOpts.enable_profile_selector = true;
            }
            if (tAttrs.profileSelectorIds) {
                loginOpts.profile_selector_ids = true;
            }

            return function linkFn(scope, element) {
                scope.dispatchLogin = function dispatchLogin() {
                    facebookService.login(loginOpts);
                };
            };
        }
    };
}

FacebookLoginDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLogin', FacebookLoginDirective);
function FacebookLogoutDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<button ng-click="dispatchLogout();">{{label}}</button>',
        scope: {
            label: '@label'
        },
        link: function (scope, element) {
            scope.dispatchLogout = function dispatchLogin() {
                facebookService.logout();
            };
        }
    };
}

FacebookLogoutDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbLogout', FacebookLogoutDirective);
function FacebookNameDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:name ng-attr-uid></fb:name>',
        scope: {
            uid: '@uid'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookNameDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbName', FacebookNameDirective);
function FacebookPostDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:post ng-attr-href ng-attr-width></fb:post>',
        scope: {
            href: '@href',
            width: '@width'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookPostDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbPost', FacebookPostDirective);
function FacebookProfilePicDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<img ng-attr-width ng-attr-height />',
        scope: {
            uid: '@uid',
            type: '@type',
            width: '@width',
            height: '@height'
        },
        compile: function compileFn(tElement, tAttrs) {
            return function linkFn(scope, element) {
                facebookService.ready.then(function () {
                    var pictureUrl = (scope.uid) ? scope.uid + "/picture" : "/me/picture";

                    var apiCall = facebookService.api(pictureUrl, {
                        redirect: false,
                        type: scope.type,
                        width: scope.width,
                        height: scope.height
                    });

                    apiCall.then(function (response) {
                        if (response && !response.error) {
                            element.attr('src', response.data.url);
                        }
                    });
                });
            };
        }
    };
}

FacebookProfilePicDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbProfilePic', FacebookProfilePicDirective);
function FacebookSendDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:send ng-attr-href ng-attr-color-schema ng-attr-width ng-attr-height></fb:send>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            width: '@width',
            height: '@height',
            // Events
            messageSend: '@onMessageSend'
        },
        link: function (scope, element) {
            function messageSendHandler(url) {
                if (url === scope.href) {
                    // Call the scope event if the htmlElement match
                    scope.messageSend({ url: url });
                }
            }

            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
                facebookService.Event.subscribe('message.send', messageSendHandler);
            });

            scope.$on('$destroy', function () {
                facebookService.Event.unsubscribe('message.send', messageSendHandler);
            });
        }
    };
}

FacebookSendDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbSend', FacebookSendDirective);
function FacebookShareDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:share-button ng-attr-href ng-attr-type></fb:share-button>',
        scope: {
            href: '@href',
            type: '@type'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
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
                 * Initialize the Facebook SDK for Javsacript.
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
                    $rootScope.$apply(function () {
                        defer.resolve.apply(this, arguments);
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
})(window, document);

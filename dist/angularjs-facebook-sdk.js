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
angular.module('angularjs-facebook-sdk',
    [
        'angularjs-facebook-sdk.config',
        'angularjs-facebook-sdk.directives',
        'angularjs-facebook-sdk.services'
    ]);
angular.module('angularjs-facebook-sdk.services')
  .provider('facebookProvider', function () {

  });})(window, document);

angularjs-facebook-sdk
======================

Integration between AngularJS and Facebook SDK for Javascript.

### Using

Insert the <code>angularjs-facebook-sdk.js</code> on your page. 
Refer the module using <code>angular.module('yourModule', ['angularjs-facebook-sdk']);</code>

```javascript
// Create a config block and set the appId, language and debug mode if necessary:
angular.module('yourModule', ['angularjs-facebook-sdk'])
  .config(function (facebookProvider) {
    facebookProvider.setAppId(12345);
    facebookProvider.setLanguage('pt_BR');
    facebookProvider.setDebug(true);
  })
  .run(function (facebook) {
    facebook.init();
  });
```

### Compiling from source

Clone the project and run <code>grunt</code> on the root folder. The compiled and minified files will be generated under <code>dist</code> folder

### Running tests

To execute the unit tests run <code>karma start karma-unit.conf.js</code>. As you may seen, you'll need Karma installed globally on your system. To do it so, run <code>npm install -g karma</code> and you're good to go.

### Next releases

- I'll be using a Promise based approach to wrap all calls to the Facebook SDK API.
- Create specific functions for commons API calls.
- Create some directives for social plugins.

### Contributing

Use the issue tracker to send PRs.

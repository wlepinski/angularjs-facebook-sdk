'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('angularjs-facebook-sdk', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('angularjs-facebook-sdk');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('angularjs-facebook-sdk.config')).toBeTruthy();
    });

    

    
    it('should load directives module', function() {
        expect(hasModule('angularjs-facebook-sdk.directives')).toBeTruthy();
    });
    

    
    it('should load services module', function() {
        expect(hasModule('angularjs-facebook-sdk.services')).toBeTruthy();
    });
    

});

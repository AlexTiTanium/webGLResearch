/**
 * Created by akucherenko on 16.10.13.
 */

// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module
define.amd.jQuery = false;

require.config({

    baseUrl: 'js/',

    paths: {

        // Main libs stack
        jquery: '../vendor/jquery/jquery-2.0.3',
        underscore: '../vendor/lodash/lodash',
        backbone: '../vendor/backbone/backbone',

        // Require js plugins
        text: '../vendor/requirejs/text',

        // UI lib
        semantic: '../vendor/semantic/packaged/javascript/semantic',

        // Application
        App: 'WebGLResearch'
    },

    /**
     * Shim setup
     */
    shim: {
        jquery: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['App'], function(App) {
    App.initialize();
});
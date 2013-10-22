/**
 * Created by akucherenko on 16.10.13.
 */

// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module, we use JQ shim so not need for us
define.amd.jQuery = false;

require.config({

    // Set base url
    baseUrl: 'js/',

    /**
     * Modules path config
     */
    paths: {

        // Main libs stack
        jquery:     '../vendor/jquery/jquery-2.0.3',
        underscore: '../vendor/lodash/lodash',
        backbone:   '../vendor/backbone/backbone',
        toolbox:    '../vendor/jstoolsbox/toolbox',
        three:      '../vendor/threejs/build/three',

        // Require js plugins
        text: '../vendor/requirejs/text',

        // UI lib
        semantic: '../vendor/semantic/packaged/javascript/semantic',

        // Application
        app:            'WebGLResearch',
        router:         'router/MainRouter',
        baseBehaviour:  'lib/BaseBehaviour'
    },

    /**
     * Shim setup
     */
    shim: {

        toolbox: {
            exports: 'Toolbox',
            deps: ['underscore']
        },

        semantic: {
            deps: ['jquery']
        },

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

// Start app
require(['backbone','app', 'semantic'], function(Backbone, App) {

    App.initialize();
});
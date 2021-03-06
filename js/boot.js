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
        q:          '../vendor/q/q.min',

        // Controls
        mouse:      '../vendor/mouse/mouse',
        keyboard:   '../vendor/mousetrap/mousetrap.min',

        // Require js plugins
        text: '../vendor/requirejs/text',

        // UI lib
        semantic: '../vendor/semantic/packaged/javascript/semantic',
        slider:   '../vendor/slider/js/ion.rangeSlider',

        // Application
        app:            'WebGLResearch',
        router:         'router/MainRouter',
        baseBehaviour:  'lib/BaseBehaviour',

        // Utils
        stats:          '../vendor/threejs/build/stats.min',

        // Loaders
        colladaLoader:  'lib/loaders/ColladaLoader'
    },

    /**
     * Shim setup
     */
    shim: {

        three: {
            exports: 'THREE'
        },

        colladaLoader: {
            exports: 'THREE.ColladaLoader'
        },

        stats: {
            exports: 'Stats',
            deps: ['three']
        },

        slider: {
            deps: ['jquery']
        },

        toolbox: {
            exports: 'Toolbox',
            deps: ['underscore']
        },

        mouse: {
            exports: 'Window.prototype.Mouse'
        },

        semantic: {
            deps: ['jquery']
        },

        jquery: {
            exports: '$'
        },

        q: {
            exports: 'Q'
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
require(['backbone','app', 'semantic', 'three', 'slider'], function(Backbone, App) {

    App.initialize();
});
/**
 * Created by akucherenko on 16.10.13.
 */

// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module
define.amd.jQuery = true;

require.config({

    paths: {

        // Main libs stack
        jQuery: 'vendor/jquery/jquery-2.0.3',
        Underscore: 'vendor/lodash/lodash',
        Backbone: 'vendor/backbone/backbone',
        Semantic: 'vendor/semantic/packaged/javascript/semantic',

        // Application
        App: 'js/WebGLResearch'
    },

    shim: {
        'Backbone': ['Underscore', 'jQuery'],
        'App': ['Backbone']
    }
});

require(['App'], function(App) {
    App.initialize();
});
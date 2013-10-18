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
        $: 'vendor/jquery/jquery-2.0.3',
        _: 'vendor/lodash/lodash',
        backbone: 'vendor/backbone/backbone',

        // UI lib
        semantic: 'vendor/semantic/packaged/javascript/semantic',

        // Application
        App: 'js/WebGLResearch'
    },

    shim: {
        '$': {
            exports: '$'
        },
        'backbone': {
            deps: ['_', '$'],
            exports: 'backbone'
        }
    }
});

require(['App'], function(App) {
    App.initialize();
});
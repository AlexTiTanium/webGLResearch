/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'backbone',
    'jquery',
    'view/SelectScene',
    'view/LoadScene'
], function (Backbone, $, SelectScene, LoadScene) {

    /**
     * MainRouter class
     * @class MainRouter
     */
    return Backbone.Router.extend({

        // Router init
        initialize: function () {

        },

        /**
         * Routers paths
         */
        routes: {
            '': 'selectScene',
            'scene/:sceneId': 'loadScene'
        },

        /**
         * Reactions callbacks
         */

        // Home default reaction
        selectScene: function () {

            new SelectScene({ el: $('#content') });
        },

        // Load scene
        loadScene: function (sceneId) {

            new LoadScene({ el:  $('#content'), sceneId: sceneId });
        }

    });

});
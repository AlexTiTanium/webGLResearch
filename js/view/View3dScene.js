/**
 * Created by akucherenko on 21.10.13.
 *
 * Select scene screen view
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'text!template/view3dScene.html',
    'lib/Engine'
], function (Backbone, _, $, template, Engine) {

    /**
     * SceneJsLoader view class
     *
     *  @class View3dScene
     */
    return Backbone.View.extend({

        // Define template source view3dScene.html
        template: _.template(template),

        /**
         * @property {THREE.Scene} scene
         */
        scene: null,

        /**
         * Init view fetch collection from server
         */
        initialize: function (attrs) {

            // Get params from router
            this.scene = attrs.scene;

            // Create scene and start render process
            this.render();
        },

        /**
         * Update view
         */
        render: function () {

            // Init engine
            var engine = new Engine(this.$el, this.scene);

            // Render
            engine.start();
        }

    });
});
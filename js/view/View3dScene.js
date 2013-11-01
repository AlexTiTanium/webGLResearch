/**
 * Created by akucherenko on 21.10.13.
 *
 * Select scene screen view
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'text!template/view3dScene.html'
], function (Backbone, _, $, template) {

    /**
     * View3dScene view class
     *
     *  @class View3dScene
     */
    return Backbone.View.extend({

        // Define template source view3dScene.html
        template: _.template(template),

        /**
         * @property {Engine} engine
         */
        engine: null,

        /**
         * Init view fetch collection from server
         */
        initialize: function (attrs) {

            var scope = this;

            // Get params from router
            scope.engine = attrs.engine;

            // Trigger on window resize event
            scope.engine.events.on("render:start", function(){
                scope.listenResizeEvent();
            });

            scope.render();
        },

        /**
         * Init some system events
         */
        listenResizeEvent: function(){

            var scope = this;

            window.addEventListener('resize', function(){

                scope.engine.events.trigger("window:resize");
            }, false );
        },

        /**
         * Update view
         */
        render: function () {

            this.engine.beginRenderToContainer(this.$el);
        }

    });
});
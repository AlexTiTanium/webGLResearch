/**
 * Created by akucherenko on 21.10.13.
 *
 * Select scene screen view
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'text!template/loadScene.html',
    'collection/SceneCollection',
    'lib/Engine',
    'view/View3dScene'
], function (Backbone, _, $, template, SceneCollection, Engine, View3dScene) {

    /**
     * LoadScene view class
     *
     *  @class LoadScene
     */
    return Backbone.View.extend({

        /**
         * Define template source loadScene.html
         */
        template: _.template(template),

        /**
         * Event listeners
         */
        events: {
            "click #start-btn": "show3dScene"
        },

        /**
         * Collection of scene, user must select one of theme
         *
         * @param  {Backbone.Collection} collectionScenes
         */
        collection: null,

        /**
         * Router must set scene id attr
         */
        sceneId: null,

        /**
         * Current model
         */
        model: null,

        /**
         * @property {Engine} engine
         */
        scene: null,

        /**
         * Init view fetch collection from server
         */
        initialize: function (attrs) {

            // Get params from router
            this.sceneId = attrs.sceneId;

            // Create instance of scenes collection
            this.collection = new SceneCollection();

            // Listen reset event
            this.listenTo(this.collection, 'reset', this.retrieveModel);

            // Get data from data source
            this.collection.fetch({reset: true}); // Some changes after 1.0, now reset not fire on fetch, need set {reset:true}
        },

        /**
         * Get data from collection by id and render view
         */
        retrieveModel: function () {

            // Retrieve from collection model by id from router
            this.model = this.collection.get(this.sceneId);

            // Crete scene from scene model
            this.scene = new Engine();

            // Listen scene event
            this.scene.on("loading:progress", this.updateProgress);
            this.scene.on("scene:ready",      this.sceneReady);

            // Init loading
            this.scene.load(this.model);

            // Update view
            this.render();
        },

        /**
         * Progress bar
         *
         * @param {int} percent - from 0 to 100%
         */
        updateProgress: function (percent) {

            // Set width attr, see template loadScene.html
            $('#scene-loading-progress').css('width', percent + '%');
        },

        /**
         * Fire when scene success loaded
         */
        sceneReady: function(){

            $('#start-btn-grid').show();
        },

        /**
         * Change view to View3dScene
         */
        show3dScene: function () {

            // Load view with WebGL render
            new View3dScene({ el: $('#content'), scene: this.scene });
        },

        /**
         * Update view
         */
        render: function () {

            // Show loading progress
            this.$el.html(this.template({ scene: this.model.toJSON() }));
        }

    });
});
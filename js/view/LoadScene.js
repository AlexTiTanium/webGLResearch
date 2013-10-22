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
    'lib/Scene'
    ],
    function (Backbone, _, $, template, SceneCollection, Scene){

    return Backbone.View.extend({

        // Define template source
        template: _.template(template),

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
         * Init view fetch collection from server
         */
        initialize: function (attrs) {

            // Get params from router
            this.sceneId = attrs.sceneId;

            // Create instance of scenes collection
            this.collection = new SceneCollection();

            // Listen reset event
            this.listenTo(this.collection, 'reset',  this.retrieveModel);

            // Get data from data source
            this.collection.fetch({reset:true}); // Some changes after 1.0, now reset not fire on fetch, need set {reset:true}
        },

        /**
         * Get data from collection by id and render view
         */
        retrieveModel: function(){

            // Retrieve from collection model by id from router
            this.model = this.collection.get(this.sceneId);

            var scene = new Scene(this.model);

            // Update view
            this.render();
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
/**
 * Created by akucherenko on 21.10.13.
 *
 * Select scene screen view
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'text!template/selectLevel.html',
    'collection/SceneCollection'
    ],
    function (Backbone, _, $, template, SceneCollection){

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
         * Init view fetch collection from server
         */
        initialize: function () {

            // Create instance of scenes collection
            this.collection = new SceneCollection();

            // Listen reset event
            this.listenTo(this.collection, 'reset',  this.render);

            // Get data from data source
            this.collection.fetch({reset:true}); // Some changes after 1.0, now reset not fire on fetch, need set {reset:true}
        },

        /**
         * Update view
         */
        render: function () {


        }

    });
});
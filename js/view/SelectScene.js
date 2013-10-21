/**
 * Created by akucherenko on 21.10.13.
 *
 * Select scene screen view
 */
define(['backbone', 'underscore', 'text!template/selectLevel.html', 'collection/SceneCollection'], function (Backbone, _, template, SceneCollection){

    return Backbone.View.extend({

        id: "content",

        // Define template source
        template: _.template(template),

        // Event listeners
        events: {
            //"click .icon":          "open",
            //"click .button.edit":   "openEditDialog",
            //"click .button.delete": "destroy"
        },

        /**
         * Collection of scene, user must select one of theme
         *
         * @param  {Backbone.Collection} collectionScenes
         */
        collectionScenes: new SceneCollection(),

        /**
         * Init view fetch collection from server
         */
        initialize: function () {

            // Get data from data source
            this.collectionScenes.fetch();
        },

        /**
         * Update view
         */
        render: function () {

            console.log(this.collectionScenes.toJSON());

            // Dynamically updates the UI with the view's template
            this.$el.html(this.template(this.collectionScenes.toJSON()));

            // Maintains chainability
            return this;
        }

    });
});
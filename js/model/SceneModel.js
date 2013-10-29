/**
 * Created by akucherenko on 21.10.13.
 */
define(['backbone', 'jquery', 'underscore'], function (Backbone, $, _) {

    /**
     * SceneModel class
     * @class SceneModel
     */
    return Backbone.Model.extend({

        /**
         * Default fields set
         */
        defaults: {
            "id": "Unique scene name",
            "name": "Demo scene name",
            "scenePath": "Path to scene file",
            "description": "Description",
            "config": ''
        },

        /**
         * Get configs
         */
        getConfig: function(callback){

            $.getJSON(this.get('config') , function(result){
                callback(result);
            }).fail(function(error){

                    throw new Error("Error get scene config: " + error.message);
            });
        }

    });

});
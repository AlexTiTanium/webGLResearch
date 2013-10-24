/**
 * Created by akucherenko on 21.10.13.
 */
define(['backbone', 'jquery'], function (Backbone, $) {

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
            "description": "Description"
        }
    });

});
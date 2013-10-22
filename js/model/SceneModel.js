/**
 * Created by akucherenko on 21.10.13.
 */
define(['backbone'], function (Backbone){

    /**
     * SceneModel class
     * @class SceneModel
     */
    return Backbone.Model.extend({

        defaults: {
            "name":         "Demo scene name",
            "scene":        "Path to scene file",
            "description":   "Description"
        }
    });

});
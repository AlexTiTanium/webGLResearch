/**
 * Created by akucherenko on 21.10.13.
 */
define(['backbone'], function (Backbone){

    return Backbone.Model.extend({

        defaults: {
            "name":         "Demo scene name",
            "scene":        "Path to scene file",
            "description":   "Description"
        }
    });

});
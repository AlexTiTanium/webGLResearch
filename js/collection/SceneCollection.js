/**
 * Created by akucherenko on 21.10.13.
 */
define(['backbone', 'model/SceneModel'], function (Backbone, SceneModel){

    return Backbone.Collection.extend({
        url: 'api/scenes.json',
        model: SceneModel
    });

});
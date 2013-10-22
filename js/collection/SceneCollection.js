/**
 * Created by akucherenko on 21.10.13.
 */
define(['backbone', 'model/SceneModel'], function (Backbone, SceneModel){

    /**
     * SceneCollection class
     *
     * @class SceneCollection
     *
     * @property {String} url
     * @property {SceneModel} model
     *
     * @returns {SceneCollection|Backbone.Collection}
     */
    return Backbone.Collection.extend({

        url: 'api/scenes.json',
        model: SceneModel
    });

});
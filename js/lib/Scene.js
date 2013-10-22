/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour'], function (BaseBehaviour){

    /**
     * Scene object
     *
     *  @class Scene
     */
    return BaseBehaviour.extend({

        /**
         * @property {SceneModel} sceneModel
         */
        scene: null,

        /**
         *  Create scene instance, from scene model
         *
         * @param {SceneModel} sceneModel
         */
        constructor : function(sceneModel) {

            this.scene = sceneModel;
        },

        /**
         * Begin scene loading
         */
        load: function(){


        }

    });
});
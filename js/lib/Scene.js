/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour', 'lib/loaders/SceneJsLoader'], function (BaseBehaviour, SceneLoader){

    /**
     * Scene class
     *
     *  @class Scene
     */
    return BaseBehaviour.extend({

        /**
         * @property {SceneModel} sceneModel
         */
        sceneModel: null,

        /**
         * @property {SceneLoader} sceneLoader
         */
        sceneLoader: null,

        /**
         * @property {THREE.Scene} scene
         */
        sceneThree: null,

        /**
         *  Create scene instance, from scene model
         *
         * @param {SceneModel} sceneModel
         */
        constructor : function(sceneModel) {

            var scope = this;

            // Init
            scope.sceneModel = sceneModel;
            scope.sceneLoader = new SceneLoader();

            // Listen events
            scope.sceneLoader.on('progress', function(loaded){
                scope.trigger('progress', loaded);
            });

            scope.sceneLoader.on('loaded', function(scene){
                scope.sceneThree = (scene);
                scope.trigger('scene:ready');
            });
        },

        /**
         * Begin scene loading
         */
        load: function(){

            var path = this.sceneModel.get("scenePath");

            this.sceneLoader.load(path);
        },

        /**
         * Add object to scene
         *
         * @param object
         */
        add: function(object){

            this.sceneThree.add(object);
        },

        /**
         * Remove from scene
         *
         * @param object
         */
        remove: function(object){

            this.sceneThree.remove(object);
        }

    });
});
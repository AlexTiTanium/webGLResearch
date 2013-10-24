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

            var self = this;

            // Init
            self.sceneModel = sceneModel;
            self.sceneLoader = new SceneLoader();

            // Listen events
            self.sceneLoader.on('progress', function(loaded){
                self.trigger('progress', loaded);
            });

            self.sceneLoader.on('loaded', function(scene){
                self.sceneThree = (scene);
                self.trigger('scene:ready');
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
        }

    });
});
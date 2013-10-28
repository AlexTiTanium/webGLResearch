/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'underscore',
    'lib/loaders/SceneJsLoader',
    'lib/Viewport'
], function (BaseBehaviour,  _, SceneLoader, Viewport){

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
         * @property {Viewport} viewport
         */
        viewport: null,

        /**
         * @property {SceneLoader} sceneLoader
         */
        sceneLoader: null,

        /**
         * @property {THREE.Scene} sceneThree
         */
        sceneThree: null,

        /**
         * Script Engine
         *
         * @property {ScriptEngine} scriptEngine
         */
        scriptEngine: null,

        /**
         * @property {THREE.Camera} defaultCamera
         */
        defaultCamera: null,

        skyBoxTexture: null,

        /**
         *  Create scene instance, from scene model
         *
         * @param {ScriptEngine} scriptEngineInstance
         */
        constructor : function(scriptEngineInstance) {

            var scope = this;

            // Init
            scope.sceneLoader = new SceneLoader();

            // Script engine
            scope.scriptEngine = scriptEngineInstance;

            scope.viewport = new Viewport();

            // Listen events
            scope.sceneLoader.on('progress', function(loaded){
                scope.trigger('loading:progress', loaded);
            });

            scope.sceneLoader.on('loaded', function(object){

                scope.sceneParse(object);
            });
        },

        /**
         *
         * @param result
         */
        sceneParse: function(result){

            var scope = this, scene = result.scene;

            this.defaultCamera = new THREE.PerspectiveCamera(45, this.viewport.getAspect(), 0.1, 1000);
            scene.add(this.defaultCamera);

            this.sceneThree = scene;

            // Attache scripts
            this.scriptEngine.attachScripts();

            /////// Temp

            var r = "scenes/first/skybox/dawnmountain-";
            var urls = [ r + "xpos.png", r + "xneg.png",
                r + "ypos.png", r + "yneg.png",
                r + "zpos.png", r + "zneg.png" ];

            var textureCube = THREE.ImageUtils.loadTextureCube( urls );
            textureCube.format = THREE.RGBFormat;

            this.skyBoxTexture = textureCube;
            /////

            scope.trigger('scene:ready');
        },

        /**
         * Begin scene loading
         *
         * @param {SceneModel} sceneModel
         */
        load: function(sceneModel){

            this.sceneModel = sceneModel;
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
        },

        /**
         * Find object on scene by name
         *
         * @param {String} name
         */
        find: function(name){

            return this.sceneThree.getObjectByName(name, true);
        },

        /**
         * Recursive iteration over scene objects
         *
         * @param {Function} callback
         */
        traverse: function(callback){

            this.sceneThree.traverse(callback);
        }

    });
});
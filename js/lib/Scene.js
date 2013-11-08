/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'underscore',
    'lib/loaders/SceneJsLoader',
    'lib/Viewport',
    'q'
], function (BaseBehaviour,  _, SceneLoader, Viewport, Q){

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
         * @property {object} config
         */
        config: null,

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
         * Engine
         *
         * @property {Engine} Engine
         */
        engine: null,

        /**
         * @property {THREE.Camera} defaultCamera
         */
        defaultCamera: null,

        /**
         * Here store skybox texture for possible cubMap
         *
         * @property {THREE.Texture} defaultCamera
         */
        skyBoxTexture: null,

        /**
         *  Create scene instance, from scene model
         *
         * @param {Engine} engine
         */
        constructor : function(engine) {

            var scope = this;

            // Init
            scope.sceneLoader = new SceneLoader();

            // Script engine
            scope.scriptEngine = engine.scriptEngine;
            scope.engine = engine;

            scope.viewport = new Viewport();

            // Listen events
            scope.sceneLoader.on('progress', function(loaded){

                scope.engine.events.trigger('loading:progress', loaded / 2); // Because we ned also parse scene, and report this progress
                                                                             // Loaded model is only 50%, 50% parsing scene
            });

            scope.sceneLoader.on('loaded', function(scene){
                scope.sceneParse(scene);
            });
        },

        /**
         * Prepare scene, load script, do some fixes
         *
         * @param scene
         */
        sceneParse: function(scene){

            var scope = this;
            this.sceneThree = scene;

            Q().then(function(){

                // This was brake normals position, this fast fix for this
                scene.rotation.fromArray( [0,0,0] );
                scene.updateMatrix();
                scene.updateMatrixWorld();
                // -------------------------------------

                // Fog
                scene.fog = new THREE.FogExp2(0xFFFFFF,  0.009);

                // Add camera
                scope.defaultCamera = new THREE.PerspectiveCamera(45, scope.viewport.getAspect(), 0.1, 1000);

                scene.add(scope.defaultCamera);

            })
                .then(function(){

                    var deferred = Q.defer();

                    // Get scene config
                    scope.sceneModel.getConfig(function(config){

                        scope.config = config;
                        deferred.resolve();
                    });

                    return deferred.promise;
                })
                .then(function(){

                    // Load script lib, loadScriptsLib return promise
                    return scope.scriptEngine.loadScriptsLib();
                })
                .then(function(){

                    // Attache scripts, return promise
                    return scope.scriptEngine.attachScripts();
                })
                .fail(function(error){

                    console.error('Error on parse scene: ' + error.message);

                    // Create error message in scope
                    scope.engine.events.trigger('loading:error',  error.message);

                    // Re throw error
                    throw error;
                })
                .done(function(){

                    // Create success message in scope
                    scope.engine.events.trigger('loading:progress', 100);
                    scope.engine.events.trigger('scene:ready');
                });
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
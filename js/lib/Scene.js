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
            this.sceneThree = scene;

            Q().then(function(){

                // This was brake normals position, this fast fix for this
                scene.rotation.fromArray( [0,0,0] );
                scene.updateMatrix();
                scene.updateMatrixWorld();
                // -------------------------------------

                // Add camera
                scope.defaultCamera = new THREE.PerspectiveCamera(45, scope.viewport.getAspect(), 0.1, 1000);
                scene.add(scope.defaultCamera);

            })
                .then(function(){

                    var deferred = Q.defer();

                    scope.sceneModel.getConfig(function(config){

                        scope.config = config;
                        deferred.resolve();
                    });

                    return deferred.promise;
                })
                .then(function(){

                    var deferred = Q.defer();

                    /////// Temp
                    var r = "scenes/first/skybox/dawnmountain-";
                    var urls = [ r + "xpos.png", r + "xneg.png",
                        r + "ypos.png", r + "yneg.png",
                        r + "zpos.png", r + "zneg.png" ];

                    THREE.ImageUtils.loadTextureCube(urls, false, function(texture){

                        texture.format = THREE.RGBFormat;
                        scope.skyBoxTexture = texture;

                        deferred.resolve();
                    }, function(error){

                        deferred.reject(new Error("Enable load skybox texture, error: " +   error.message));

                    });
                    /////

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
                    scope.trigger('loading:error',  error.message);

                    // Re throw error
                    throw error;
                })
                .done(function(){

                    // Create success message in scope
                    scope.trigger('scene:ready');
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
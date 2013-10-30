/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'lib/ScriptObject',
    'q',
    'jquery'
], /**
 * @param {BaseBehaviour} BaseBehaviour
 * @param {ScriptObject} ScriptObject
 * @param {Q} Q
 * @param {jquery} $
 */
    function (BaseBehaviour, ScriptObject, Q, $) {

    /**
     * ScriptEngine class
     *
     *  @class ScriptEngine
     */
    return BaseBehaviour.extend({

        /**
         * Engine instance
         *
         * @property {Engine} engine
         */
        engine: null,

        /**
         * Collection of ScriptObjects
         *
         * @property [ScriptObject] collectionScriptObjects
         */
        collectionScriptObjects: [],

        /**
         * Here we save paths to scripts, { skybox: "lib/scripts/skybox", ... }
         */
        scriptLib: {},

        /**
         * ScriptEngine constructor
         *
         * @param {Engine} engine
         * @constructor
         */
        constructor: function (engine) {

            this.engine = engine;
        },

        /**
         * Load script libs json, with scripts names and paths
         */
        loadScriptsLib: function(){

            var deferred = Q.defer(), scope = this;

            $.getJSON("api/scriptsLib.json", function(result){

                scope.scriptLib = result;
                deferred.resolve();
            })
                .fail(function(error){

                    deferred.reject(error);
                });

            return deferred.promise;
        },

        /**
         * Init base script sets
         *
         * @return {Q.promise}
         */
        attachScripts: function(){

            // See scenes folder json files
            var scene = this.engine.scene;
            var scripts = scene.config,
                scope = this,
                // Here save promises collection
                scriptsSequenceCollection = [],
                // Create deferred there
                sceneDeferred = Q.defer();

            // If script not need
            if(!scripts) {
                sceneDeferred.resolve();
                return sceneDeferred.promise;
            }

            // In this block we create promises array, for later sync execution

            // Prepare camera scripts order
            _.each(scripts.camera, function(script){
                // We need return promise but not execute this code, so we wrap it to func that return promise
                scriptsSequenceCollection.push(function(){
                    return scope.addScript(scene.defaultCamera, script);
                });
            });

            // Prepare scene scripts order
            _.each(scripts.scene, function(script){
                scriptsSequenceCollection.push(function(){
                    return scope.addScript(scene, script);
                });
            });

            // Find object by name and prepare scripts
            _.each(scripts.objects, function(scriptsArray, objectName){

                // find object by name
                var object = scene.find(objectName);

                // If object finded prepare call and push it to collection
                if(object){
                    _.each(scriptsArray, function(script){
                        scriptsSequenceCollection.push(function(){
                            return scope.addScript(object, script);
                        });
                    });
                }else{
                    console.warn("Object with name: "+ objectName + " not found on scene");
                }
            });

            // In this block we start execute tasks sync, task by task, all tasks will return promise
            _.reduce(scriptsSequenceCollection, Q.when, Q())
                .fail(function(error){
                    sceneDeferred.reject(new Error("Error in ScriptEngine on attaching scripts, Error: " + error.message));
                })
                .done(function(){
                    sceneDeferred.resolve();
                });

            // Return promise
            return sceneDeferred.promise;
        },

        /**
         * Add script
         *
         * @param {object} object
         * @param {object} scriptConfig - { path: 'path to script required', ... other options will be sended to script }
         *
         * @return {Q.promise}
         */
        addScript: function (object, scriptConfig) {

            // Init set
            var scope = this, scriptObject = null;
            var index = scope.collectionScriptObjects.indexOf(object);
            var deferred = Q.defer();

            // Detect script path
            var scriptPath = scope.scriptLib[scriptConfig.script];

            // Require script by require js
            require([scriptPath], function (Script) {

                // If script not found throw exception
                if (!Script) {
                    throw new Error("Script not found by path: " + scriptConfig.script);
                }

                // If not found, not found == -1
                if (index == -1) {
                    // Crete new script object
                    scriptObject = new ScriptObject(object, scope.engine);
                    scope.collectionScriptObjects.pop(scriptObject);
                } else {
                    // Return existed script object
                    scriptObject = scope.collectionScriptObjects[index];
                }

                // Add
                var baseScript = scriptObject.attachScript(Script, scriptConfig);

                // baseScript.awake();
                baseScript.ready(deferred);

            }, function(error){
                deferred.reject(error);
            });

            // Return promise
            return deferred.promise;
        }
    });
});

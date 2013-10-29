/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'lib/ScriptObject'
], /**
 * @param {BaseBehaviour} BaseBehaviour
 * @param {ScriptObject} ScriptObject
 */
    function (BaseBehaviour, ScriptObject) {

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
         * ScriptEngine constructor
         *
         * @param {Engine} engine
         * @constructor
         */
        constructor: function (engine) {

            this.engine = engine;
        },

        /**
         * Init base script sets
         */
        attachScripts: function(){

            // See scenes folder json files
            var scene = this.engine.scene;
            var scripts = scene.config,
                scope = this;

            if(!scripts) { return; }

            // Camera
            _.each(scripts.camera, function(script){

                scope.addScript(scene.defaultCamera, script);
            });

            // Scene
            _.each(scripts.scene, function(script){

                scope.addScript(scene, script);
            });

            // Find object by name and attach scripts
            _.each(scripts.objects, function(scriptsArray, objectName){

                var object = scene.find(objectName);

                if(object){

                    _.each(scriptsArray, function(script){
                        scope.addScript(object, script);
                    });

                }else{
                    console.warn("Object with name: "+ objectName + " not found on scene");
                }
            });
        },

        /**
         * Add script
         *
         * @param {object} object
         * @param {object} scriptConfig - { path: 'path to script required', ... other options will be sended to script }
         */
        addScript: function (object, scriptConfig) {

            var scope = this, scriptObject = null;
            var index = scope.collectionScriptObjects.indexOf(object);

            require([scriptConfig.script], function (Script) {

                if (!Script) {
                    throw new Error("Script not found by path: " + scriptConfig.script);
                }

                if (index > 0) {
                    scriptObject = scope.collectionScriptObjects[index];
                } else {
                    scriptObject = new ScriptObject(object, scope.engine);
                    scope.collectionScriptObjects.pop(scriptObject);
                }

                scriptObject.attachScript(Script, scriptConfig);
            });
        }
    });
});

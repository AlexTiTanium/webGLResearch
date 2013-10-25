/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'lib/ScriptObject'
], function (BaseBehaviour, ScriptObject) {

    /**
     * ScriptEngine class
     *
     *  @class ScriptEngine
     */
    return BaseBehaviour.extend({

        /**
         * Engine instance
         *
         * @property {Engine} collectionScriptObjects
         */
        engine: null,

        /**
         * Collection of ScriptObjects
         *
         * @property [ScriptObject] collectionScriptObjects
         */
        collectionScriptObjects: [],

        /**
         * Engine constructor
         *
         * @param {Engine} engine
         * @constructor
         */
        constructor: function (engine) {

            this.engine = engine;
        },

        /**
         * Add script
         *
         * @param {object} object
         * @param {string} scriptPath
         */
        addScript: function(object, scriptPath){

            var scope = this, scriptObject = null;
            var index = scope.collectionScriptObjects.indexOf(object);

            require([scriptPath], function(Script) {

                if(index > 0){
                    scriptObject = scope.collectionScriptObjects[index];
                }else{
                    scriptObject = new ScriptObject(object, scope.engine, scope);
                    scope.collectionScriptObjects.pop(scriptObject);
                }

                scriptObject.attachScript(Script);
            });
        }
    });
});

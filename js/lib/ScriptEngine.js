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

            var self = this, scriptObject = null;
            var index = self.collectionScriptObjects.indexOf(object);

            require([scriptPath], function(Script) {

                if(index > 0){
                    scriptObject = self.collectionScriptObjects[index];
                }else{
                    scriptObject = new ScriptObject(object, self.engine, self);
                    self.collectionScriptObjects.pop(scriptObject);
                }

                scriptObject.attachScript(Script);
            });
        }
    });
});

/**
 * Created by akucherenko on 24.10.13.
 */
/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'lib/ScriptObject'
], function (BaseBehaviour, ScriptObject) {

    /**
     * Engine class
     *
     *  @class Engine
     */
    return BaseBehaviour.extend({

        /**
         * Engine instance
         */
        engine: null,

        /**
         * Collection of ScriptObjects
         */
        collectionScriptObjects: [],

        /**
         * Engine constructor
         *
         * @constructor
         */
        constructor: function (engine) {

            this.engine = engine;
        },

        /**
         * Add script
         */
        addScript: function(object, scriptPath){

            var self = this, scriptObject = null;
            var index = self.collectionScriptObjects.indexOf(object);

            require([scriptPath], function(Script) {

                if(index > 0){
                    scriptObject = self.collectionScriptObjects[index];
                }else{
                    scriptObject = new ScriptObject(object, this.engine);
                    self.collectionScriptObjects.pop(scriptObject);
                }

                scriptObject.attachScript(Script);
            });
        }
    });
});

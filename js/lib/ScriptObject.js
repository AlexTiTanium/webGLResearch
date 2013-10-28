
/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour'
], function (BaseBehaviour) {

    /**
     * ScriptObject class
     *
     *  @class ScriptObject
     */
    return BaseBehaviour.extend({

        /**
         * Engine instance
         *
         * @property {Engine} engine
         */
        engine: null,

        /**
         * Target object
         *
         * @property {object} object
         */
        object: null,

        /**
         * Object name
         *
         * @property {string} name
         */
        name: null,

        /**
         * Script collection for this object
         *
         * @property [BaseScript] scripts
         */
        scripts: [],

        /**
         * Engine constructor
         *
         * @param {object} object
         * @param {Engine} engine
         *
         * @constructor
         */
        constructor: function (object, engine) {

            this.object = object;
            this.engine = engine;
        },

        /**
         * Attach script
         *
         * @param {BaseScript} ScriptClass
         * @param {object} scriptConfig
         */
        attachScript: function(ScriptClass, scriptConfig){

            this.scripts.pop(new ScriptClass(this.object, scriptConfig, this));
        }

    });
});

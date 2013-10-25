
/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour'
], function (BaseBehaviour) {

    /**
     * BaseScript class
     *
     *  @class BaseScript
     */
    return BaseBehaviour.extend({

        /**
         * Engine instance
         *
         * @property {Engine} engine
         */
        engine: null,

        /**
         * Object for work
         *
         * @property {object} object
         */
        object: null,

        /**
         * Script object , may be you need get other scripts on this object
         *
         * @property {ScriptObject} scriptObject
         */
        scriptObject: null,

        scene: null,

        /**
         * BaseScript constructor
         *
         * @param {object} object
         * @param {Engine} engine
         * @param {ScriptObject} scriptObject
         *
         * @constructor
         */
        constructor: function (object, engine, scriptObject) {

            this.object = object;
            this.engine = engine;
            this.scriptObject = scriptObject;

            this.scene = engine.scene;

            // Init script
            this.awake();
        },

        /**
         * Override this function in script
         */
        awake: function(){

        }

    });
});

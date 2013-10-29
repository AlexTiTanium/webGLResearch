
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

        /**
         * Engine shortcut
         *
         * @property {Engine} engine
         */
        engine: null,

        /**
         * Scene shortcut
         *
         * @property {THREE.Scene} scene
         */
        scene: null,

        /**
         * Here we save script configuration
         *
         * @property {object} config
         */
        config: null,

        /**
         * BaseScript constructor
         *
         * @param {object} object
         * @param {object} scriptConfig
         * @param {ScriptObject} scriptObject
         *
         * @constructor
         */
        constructor: function (object, scriptConfig, scriptObject) {

            this.object = object;
            this.scene = scriptObject.engine.scene;

            this.scriptObject = scriptObject;
            this.config = scriptConfig;

            this.engine = scriptObject.engine;

            // Init script
            this.awake();

            this.engine.on("render:start", this.start.bind(this));
        },

        /**
         * Call on script attach
         * Override this function in script
         */
        awake: function(){

        },

        /**
         * Call after render
         */
        start: function(){

        }
    });
});

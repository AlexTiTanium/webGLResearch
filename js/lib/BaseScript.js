
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
         * Events center shortcut
         *
         * @property {EventsCenter} events
         */
        events: null,

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

            this.events = this.engine.events;

            // Init script
            this.awake();

            this.events.on("render:start", this.start.bind(this));
        },

        /**
         * ORDER: #1 runs first as script attached to object
         *
         * Call on script attach
         * Override this function in script
         */
        awake: function(){

        },

        /**
         * ORDER: #2 runs after awake, may lock scene loading
         *
         * You may override this method for loading resources or doing async tasks.
         * Scene loading will stopped until deferred resolve
         *
         * @param {Q} deferred
         * @return {Q}
         */
        ready: function(deferred){

            deferred.resolve();

            return deferred;
        },

        /**
         * ORDER: #3 runs after render has start
         *
         * Call after render
         */
        start: function(){

        }
    });
});


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
         */
        engine: null,

        /**
         * Object for work
         */
        object: null,

        /**
         * Script object , may be you need get other scripts on this object
         */
        scriptObject: null,

        /**
         * BaseScript constructor
         *
         * @constructor
         */
        constructor: function (object, engine, scriptObject) {

            this.engine = engine;
            this.object = object;
            this.scriptObject = scriptObject;

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

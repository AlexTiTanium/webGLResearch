
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
         */
        engine: null,

        id: null,

        group: null,

        object: null,

        scripts: [],

        /**
         * Engine constructor
         *
         * @constructor
         */
        constructor: function (object, engine) {

            this.engine = engine;
            this.object = object;
        },

        /**
         * Attach script
         */
        attachScript: function(ScriptClass){

            this.scripts.pop(new ScriptClass(this.object, this.engine, this));
        }

    });
});

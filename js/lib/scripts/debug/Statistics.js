/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three',
    'underscore',
    'stats',
    'keyboard',
    'jquery'
], function (BaseScript, THREE, _, Stats, Keyboard, $) {

    /**
     * Statistics class
     *
     *  @class Statistics
     */
    return BaseScript.extend({

        /**
         * Stats instance
         */
        stats: null,

        /**
         * Current status
         */
        isEnabled: false,

        /**
         * Call when script attached to object, before render
         */
        awake: function () {

            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '0px';
        },

        /**
         * Call after render
         */
        start: function(){

            var scope = this;

            if(scope.config.on){ scope.enable(); }

            Keyboard.bind('x x', function(){

                if(scope.isEnabled){
                    scope.disable();
                }else{
                    scope.enable();
                }

            });
        },

        /**
         * Enable statistic
         */
        enable: function(){

            // Append container
            this.engine.container.append(this.stats.domElement);

            // Subscribe for render loop
            this.listenTo(this.engine, "update", this.update);

            this.isEnabled = true;
        },

        /**
         * Disable statistic
         */
        disable: function(){

            // Append container
            $(this.stats.domElement).detach();

            this.stopListening(this.engine, "update");

            this.isEnabled = false;
        },

        /**
         * Call on render tick
         */
        update: function(){

            this.stats.update();
        }

    });
});

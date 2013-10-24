/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour', 'three'], function (BaseBehaviour, THREE) {

    /**
     * Viewport class
     *
     *  @class Viewport
     */
    return BaseBehaviour.extend({

        /**
         * @property {number} width
         */
        width: 960,

        /**
         * @property {number} height
         */
        height: 800,

        /**
         * View constructor
         *
         * @constructor
         */
        constructor: function (width, height) {

            this.width = width || this.getWindowWidth();
            this.height = height || this.getWindowHeight();
        },

        /**
         * Divide w / h
         *
         * @returns {number}
         */
        getAspect: function(){

            return this.width / this.height;
        },

        /**
         * Get window width
         *
         * @returns {number}
         */
        getWindowWidth: function(){

            var winWidth =  this.width;

            if (document.body && document.body.offsetWidth) {
                winWidth = document.body.offsetWidth;
            }

            return winWidth;
        },

        /**
         * Get window height
         *
         * @returns {number}
         */
        getWindowHeight: function(){

            var winHeight =  this.height;

            if (window.innerWidth && window.innerHeight) {
                winHeight = window.innerHeight;
            }

            return winHeight;
        }

    });
});

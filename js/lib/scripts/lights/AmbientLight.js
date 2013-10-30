/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three'
], function (BaseScript, THREE) {

    /**
     * AmbientLight class
     *
     *  @class AmbientLight
     */
    return BaseScript.extend({

        /**
         * Call when script attached to object
         */
        awake: function () {

            var color = this.config.color || 0xffffff;

            var ambientLight = new THREE.AmbientLight(color);

            this.scene.add(ambientLight);
        }

    });
});
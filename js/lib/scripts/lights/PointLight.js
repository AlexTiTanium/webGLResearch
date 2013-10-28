/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three'
], function (BaseScript, THREE) {

    /**
     * PointLight class
     *
     *  @class PointLight
     */
    return BaseScript.extend({

        /**
         * Call when script attached to object
         */
        awake: function () {

            var color = this.config.color || 0xffffff;
            var intensity = this.config.intensity || 1;
            var distance = this.config.intensity || 100;
            var position = this.config.position || [0, 1, 0];

            var pointLight = new THREE.PointLight(color, intensity, distance);
            pointLight.position.set( position[0], position[1], position[2]);

            this.scene.add(pointLight);
        }

    });
});

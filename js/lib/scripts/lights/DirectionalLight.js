/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three'
], function (BaseScript, THREE) {

    /**
     * DirectionalLight class
     *
     *  @class DirectionalLight
     */
    return BaseScript.extend({

        /**
         * Call when script attached to object
         */
        awake: function () {

            var color = this.config.color || 0xffffff;
            var intensity = this.config.intensity || 0.5;
            var position = this.config.position || [0, 1, 0];

            var directionalLight = new THREE.DirectionalLight(color, intensity);
            directionalLight.position.set( position[0], position[1], position[2]);

            this.scene.add(directionalLight);
        }

    });
});

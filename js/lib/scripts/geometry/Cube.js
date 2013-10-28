/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three'
], function (BaseScript, THREE) {

    /**
     * Cube class
     *
     *  @class Cube
     */
    return BaseScript.extend({

        /**
         * Call when script attached to object
         */
        awake: function () {

            var position = this.config.position || [0, 1, 0];
            var size = this.config.size || 1;

            var material = new THREE.MeshLambertMaterial( { color:0xffffff } );
            var geometry = new THREE.CubeGeometry( size, size, size );

            var cube = new THREE.Mesh( geometry, material );

            cube.position.set(position[0], position[1], position[2]);

            this.scene.add(cube);
        }

    });
});

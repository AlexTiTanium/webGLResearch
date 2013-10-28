/**
 * Created by alex on 10/28/13.
 */
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

            var imagePrefix = "scenes/first/skybox/dawnmountain-";
            var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
            var imageSuffix = ".png";
            var skyGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );

            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push( new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
                    side: THREE.BackSide
                }));

            var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
            var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );

            this.scene.add(skyBox);
        }

    });
});

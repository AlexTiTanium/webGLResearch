/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour', 'three'], function (BaseBehaviour, THREE) {

    /**
     * Camera class
     *
     *  @class Camera
     */
    return BaseBehaviour.extend({

        /**
         * @property {THREE.Camera} loader
         */
        cameraThree: null,

        /**
         * @property {Viewport} viewport
         */
        viewport: null,

        /**
         * @property {int} angle
         */
        angle: 45,

        /**
         * Must be >0, otherwise will break projection matrix
         *
         * @property {float} near
         */
        near: 0.1,

        /**
         * @property {far} near
         */
        far: 10000,

        /**
         *  Camera constructor
         *
         * @param {Viewport} viewport
         * @constructor
         */
        constructor: function (viewport) {

            this.viewport = viewport;

            this.cameraThree = new THREE.PerspectiveCamera(this.angle, viewport.getAspect(), this.near, this.far);

            this.cameraThree.position.z = 2000;
            this.cameraThree.position.x = 0;
            this.cameraThree.position.y = 200;
        }

    });
});
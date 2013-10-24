/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour', 'three'], function (BaseBehaviour, THREE) {

    /**
     * Renderer class
     *
     *  @class Renderer
     */
    return BaseBehaviour.extend({

        /**
         * @property {Scene} scene
         */
        scene: null,

        /**
         * @property {Camera} loader
         */
        camera: null,

        /**
         * @property {THREE.WebGLRenderer} rendererThree
         */
        rendererThree: null,

        /**
         * Time from last step
         */
        lastTime: null,

        /**
         * SceneJsLoader constructor
         *
         * @param {$} container
         * @param {Scene} scene
         * @param {camera} camera
         *
         * @constructor
         */
        constructor: function (container, scene, camera) {

            this.scene = scene;
            this.camera = camera;

            // Create WebGLRenderer
            this.rendererThree = new THREE.WebGLRenderer();

            // start the renderer
            this.rendererThree.setSize(this.camera.viewport.width, this.camera.viewport.height);

            // attach the render-supplied DOM element
            container.html(this.rendererThree.domElement);
        },

        /**
         * Start render loop
         */
        beginRenderLoop: function(){

            this.renderStep();
        },

        /**
         * Main render loop
         */
        renderStep: function(deltaTime){

            this.requestAnimationFrame(this.renderStep);
            this.rendererThree.render(this.scene.sceneThree,  this.camera.cameraThree);
            console.log("Render");
        },

        /**
         * Main render loop generator
         */
        requestAnimationFrame: function (callback) {

            var currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - this.lastTime ) );
            var id = setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
            this.lastTime = currTime + timeToCall;

            return id;
        },

        /**
         * Cancel loop step
         * @param id
         */
        cancelAnimationFrame: function (id) {
            clearTimeout(id)
        }

    });
});
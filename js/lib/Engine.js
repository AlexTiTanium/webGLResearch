/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'lib/Viewport',
    'lib/Camera',
    'lib/Renderer'
], function (BaseBehaviour, Viewport, Camera, Renderer) {

    /**
     * Engine class
     *
     *  @class Engine
     */
    return BaseBehaviour.extend({

        /**
         * @property {Camera} camera
         */
        camera: null,

        /**
         * @property {Scene} scene
         */
        scene: null,

        /**
         * @property {$} camera
         */
        container: null,

        /**
         * @property {Viewport} viewport
         */
        viewport: null,

        /**
         * @property {Renderer} renderer
         */
        renderer: null,

        /**
         * Engine constructor
         *
         * @constructor
         */
        constructor: function (container, scene) {

            this.scene = scene;

            // Create view and set sizes
            this.viewport = new Viewport();

            // Create camera and calculate perspective view
            this.camera = new Camera(this.viewport);

            // Add Camera to scene
            this.scene.add(this.camera.cameraThree);

            // Create render element
            this.renderer = new Renderer(container, this.scene, this.camera);
        },

        /**
         * Start render
         */
        start: function(){

            this.renderer.beginRenderLoop();
        }
    });
});

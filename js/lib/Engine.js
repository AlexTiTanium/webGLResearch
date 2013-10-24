/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'lib/Viewport',
    'lib/Camera',
    'lib/Renderer',
    'lib/ScriptEngine'
], function (BaseBehaviour, Viewport, Camera, Renderer, ScriptEngine) {

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
         * @property {$} container
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
         * Script Engine
         *
         * @property {ScriptEngine} scriptEngine
         */
        scriptEngine: null,

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

            // Script engine
            this.scriptEngine = new ScriptEngine(this);

            // Attache scripts
            this.attachScripts();
        },

        /**
         * Init base script sets
         */
        attachScripts: function(){

            this.scriptEngine.addScript(this.camera.cameraThree, 'lib/scripts/camera/CameraFreeController');
        },

        /**
         * Start render
         */
        start: function(){

            this.renderer.beginRenderLoop();
        }
    });
});

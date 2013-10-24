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
         * Time from last step
         */
        lastTime: null,

        /**
         * Engine constructor
         *
         * @param {$} container
         * @param {scene} scene
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

            // add camera controller script
            this.scriptEngine.addScript(this.camera.cameraThree, 'lib/scripts/camera/CameraPointerlockController');
        },

        /**
         * Start main render loop
         */
        start: function(){

            // Schedule firs render step
            self.requestAnimationFrame(this.renderStep.bind(this));
        },

        /**
         * Main render loop step, ~60 calls per second
         */
        renderStep: function(time){

            // Render current scene
            this.renderer.rendererThree.render(this.scene.sceneThree,  this.camera.cameraThree);

            // Notify about each tick, send delta time
            this.trigger("update", time - this.lastTime);

            // Schedule next render step
            self.requestAnimationFrame(this.renderStep.bind(this));

            // Save last time
            this.lastTime = time;
        }
    });
});

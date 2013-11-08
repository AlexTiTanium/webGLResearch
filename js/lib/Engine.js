/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'underscore',
    'lib/Renderer',
    'lib/Scene',
    'lib/ScriptEngine',
    'lib/EventsCenter'
], function (BaseBehaviour, _, Renderer, Scene, ScriptEngine, EventsCenter) {

    /**
     * Engine class
     *
     *  @class Engine
     */
    return BaseBehaviour.extend({

        /**
         * @property {Scene} scene
         */
        scene: null,

        /**
         * @property {$} container
         */
        container: null,

        /**
         * @property {Renderer} renderer
         */
        renderer: null,

        /**
         * Events service, use this for exchanging events, subscribe, trigger etc...
         */
        events: null,

        /**
         * Script Engine
         *
         * @property {ScriptEngine} scriptEngine
         */
        scriptEngine: null,

        /**
         * @property {THREE.Clock} clock
         */
        clock: null,

        /**
         * Engine constructor
         *
         *
         * @constructor
         */
        constructor: function () {

            this.events = new EventsCenter();
            this.scriptEngine = new ScriptEngine(this);
            this.clock = new THREE.Clock();
        },

        /**
         * Load scene from model
         *
         * @param sceneModel
         */
        load: function(sceneModel){

            var scope = this;

            // Crete scene
            scope.scene = new Scene(this);

            // Init scene loading from model
            scope.scene.load(sceneModel);
        },

        /**
         * Start main render loop
         */
        beginRenderToContainer: function(container){

            // Prepare render
            this.scene.defaultCamera.updateProjectionMatrix();
            this.container = container;

            // Create render
            this.renderer = new Renderer(this.container, this.scene);

            // Schedule firs render step
            this.renderStep();

            // Notify script engine and other about render start
            this.events.trigger('render:start');
        },

        /**
         * Main render loop step, ~60 calls per second
         *
         */
        renderStep: function(){

            // Schedule next render step
            self.requestAnimationFrame(this.renderStep.bind(this));

            // Update animation engine
            THREE.AnimationHandler.update(this.clock.getDelta());

            // Render current scene
            this.renderer.rendererThree.render(this.scene.sceneThree,  this.scene.defaultCamera);

            // Notify about each tick, send delta time in seconds
            this.events.trigger("update", this.clock.getDelta());
        }
    });
});

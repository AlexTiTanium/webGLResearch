/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour',
    'underscore',
    'lib/Renderer',
    'lib/Scene',
    'lib/ScriptEngine'
], function (BaseBehaviour, _, Renderer, Scene, ScriptEngine) {

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
         * Time from last step
         *
         * @property {Number} scriptEngine
         */
        lastTime: null,

        /**
         * Script Engine
         *
         * @property {ScriptEngine} scriptEngine
         */
        scriptEngine: null,

        /**
         * Engine constructor
         *
         *
         * @constructor
         */
        constructor: function () {

            this.scriptEngine = new ScriptEngine(this);
        },

        /**
         * Load scene from model
         *
         * @param sceneModel
         */
        load: function(sceneModel){

            var scope = this;

            scope.scene = new Scene(this.scriptEngine);

            // Listen events
            scope.scene.on('loading:progress', function(loaded){
                scope.trigger('loading:progress', loaded);
            });

            scope.scene.on('scene:ready', function(){
                scope.trigger('scene:ready');
            });

            scope.scene.load(sceneModel);
        },

        /**
         * Start main render loop
         */
        beginRenderToContainer: function(container){

            console.log('Start render');
            this.scene.defaultCamera.updateProjectionMatrix();

            this.renderer = new Renderer(container, this.scene);

            // Schedule firs render step
            self.requestAnimationFrame(this.renderStep.bind(this));
        },

        /**
         * Main render loop step, ~60 calls per second
         *
         * @param {number} time
         */
        renderStep: function(time){

            // Render current scene
            this.renderer.rendererThree.render(this.scene.sceneThree,  this.scene.defaultCamera);

            // Notify about each tick, send delta time
            this.trigger("update", time - this.lastTime);

            // Schedule next render step
            self.requestAnimationFrame(this.renderStep.bind(this));

            // Save last time
            this.lastTime = time;
        }
    });
});

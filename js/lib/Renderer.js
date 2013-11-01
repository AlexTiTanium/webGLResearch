/**
 * Created by akucherenko on 22.10.13.
 */

/**
 * Renderer class
 *
 *  @class Renderer
 */
define(['baseBehaviour', 'three'], function (BaseBehaviour, THREE) {


    return BaseBehaviour.extend({

        /**
         * @property {Scene} scene
         */
        scene: null,

        /**
         * @property {THREE.WebGLRenderer} rendererThree
         */
        rendererThree: null,

        /**
         * SceneJsLoader constructor
         *
         * @param {$} container
         * @param {Scene} scene
         *
         * @constructor
         */
        constructor: function (container, scene) {

            this.scene = scene;

            // Create WebGLRenderer
            this.rendererThree = new THREE.WebGLRenderer({ antialias: true });

            //this.rendererThree = new THREE.CanvasRenderer(); // Use this for debug

            // set viewport size
            this.rendererThree.setSize(this.scene.viewport.width, this.scene.viewport.height);

            // Options
            this.rendererThree.gammaInput = true;
            this.rendererThree.gammaOutput = true;
            this.rendererThree.physicallyBasedShading = true;

            //this.rendererThree.shadowMapEnabled = true;
            //this.rendererThree.shadowMapType = THREE.PCFSoftShadowMap;

            // attach the render-supplied DOM element
            container.html(this.rendererThree.domElement);

            // Listen window resize event
            scene.engine.events.on("window:resize", this.windowResize.bind(this));
        },

        /**
         * Window resize event
         */
        windowResize: function(){

            var viewport = this.scene.viewport;

            viewport.updateWindowSize();

            this.scene.defaultCamera.aspect = viewport.getAspect();

            this.scene.defaultCamera.updateProjectionMatrix();
            this.rendererThree.setSize(viewport.width, viewport.height)
        }
    });
});
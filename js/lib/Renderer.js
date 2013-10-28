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
            //this.rendererThree = new THREE.WebGLRenderer({ antialias: true });
            this.rendererThree = new THREE.WebGLRenderer({ antialias: true });
            //this.rendererThree = new THREE.CanvasRenderer();

            // start the renderer
            this.rendererThree.setSize(this.scene.viewport.width, this.scene.viewport.height);

            // Options
            this.rendererThree.gammaInput = true;
            this.rendererThree.gammaOutput = true;
            this.rendererThree.physicallyBasedShading = true;

            // attach the render-supplied DOM element
            container.html(this.rendererThree.domElement);
        }

    });
});
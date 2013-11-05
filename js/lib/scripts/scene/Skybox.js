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
         * Some settings
         */
        directions: ["posx", "negx", "posy", "negy", "posz", "negz"],
        imageSuffix: ".png",

        /**
         * Path to
         */
        path: null,

        /**
         * Images type (jpeg , png)
         */
        type: null,

        /**
         * Call when script attached to object
         */
        awake: function () {

            this.path = this.config.path || '/';
            this.type = this.config.type || this.imageSuffix;
        },

        /**
         * Load texture
         *
         * @param deferred
         */
        ready: function(deferred){

            var scope = this;

            var urls =_.map(scope.directions, function(file){

                return scope.path + file + scope.type;
            });

            THREE.ImageUtils.loadTextureCube(urls, false, function(texture){

                texture.format = THREE.RGBFormat;
                scope.scene.skyBoxTexture = texture;
                scope.createSkybox(texture);

                deferred.resolve();

            }, function(error){

                deferred.reject(new Error("Enable load skybox texture, error: " +   error.message));

            });

            return deferred;
        },

        /**
         *  Create mesh and shader for skybox and add it to the scene
         *
         * @param {THREE.Texture} texture
         */
        createSkybox: function(texture){

            var shader = THREE.ShaderLib["cube"];
            shader.uniforms["tCube"].value = texture;

            var material = new THREE.ShaderMaterial({
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            }),

            mesh = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), material);
            this.scene.add(mesh);
        }

    });
});

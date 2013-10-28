/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour', 'three'], function (BaseBehaviour, THREE) {

    /**
     * SceneJsLoader object
     *
     *  @class SceneJsLoader
     */
    return BaseBehaviour.extend({

        /**
         * @property {SceneLoader} loader
         */
        loader: null,

        /**
         *  SceneJsLoader constructor
         *
         *  @constructor
         */
        constructor: function () {

            this.loader = new THREE.SceneLoader();
            this.loader.callbackProgress = this.updateLoadingProgress.bind(this);
        },

        /**
         * Load scene
         *
         * @param {string} url
         */
        load: function(url){

            var scope = this;

            this.loader.load(url, function(data){

                scope.trigger("loaded", data);
            });
        },

        /**
         * Send event progress
         */
        updateLoadingProgress: function (progress, result) {

            var percent = 100;
            var total = progress.totalModels + progress.totalTextures;
            var loaded = progress.loadedModels + progress.loadedTextures;

            if (total){
                percent = Math.floor( percent * loaded / total );
            }

            this.trigger("progress", percent);
        }

    });
});
/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour', 'three', 'colladaLoader'], function (BaseBehaviour, THREE, ColladaLoader) {

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

        },

        /**
         * Load scene
         *
         * @param {string} url
         */
        load: function(url){

            // Get file ext without dot
            var extension = url.split('.').pop();

            switch (extension){

                // Supported loaders
                case 'js':  this.loadJsScene(url);          break;
                case 'dae': this.loadColladaScene(url);     break;

                // Throw error if  file ext is unknown
                default: throw new Error("Unknown file format: ." + extension); break;
            }
        },

        /**
         * Load scene in THREE JS format
         *
         * @param url
         */
        loadJsScene: function(url){

            var scope = this;

            scope.loader = new THREE.SceneLoader();
            scope.loader.callbackProgress = function(progress){

                var total = progress.totalModels + progress.totalTextures;
                var loaded = progress.loadedModels + progress.loadedTextures;

               scope.updateLoadingProgress(total, loaded);
            };

            scope.loader.load(url, function(data){

                scope.trigger("loaded", data.scene);
            });
        },


        /**
         * Load scene in collada format
         *
         * @param url
         */
        loadColladaScene: function(url){

            var scope = this;

            scope.loader = new ColladaLoader();
            scope.loader.options.convertUpAxis = true;

            scope.loader.load(url, function (collada) {

                var scene =  new THREE.Scene();
                scene.add(collada.scene);

                var deleteThis = [];

                scene.traverse(function(object){

                    if(object instanceof THREE.PerspectiveCamera){
                        deleteThis.push(function() { object.parent.remove(object); });
                    }

                });

                if(deleteThis){
                    _.each(deleteThis, function(callback){  callback(); });
                }

                //scene.scale.x = scene.scale.y = scene.scale.z = 0.002;
                //scene.updateMatrix();

                scope.trigger("loaded", scene);

            }, function(progress){

                scope.updateLoadingProgress(progress.total, progress.loaded);
            });
        },

        /**
         * Send event progress
         */
        updateLoadingProgress: function (total, loaded) {

            var percent = 100;

            if (total){
                percent = Math.floor( percent * loaded / total );
            }

            this.trigger("progress", percent);
        }

    });
});
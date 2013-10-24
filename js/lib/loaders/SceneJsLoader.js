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
         * Events Set
         */
        events : {
            progress:   'progress',
            loaded:     'loaded'
        },

        /**
         * @property {LoadingManager} loaderManager
         */
        loaderManager: null,

        /**
         * @property {ObjectLoader} loader
         */
        loader: null,

        /**
         *  SceneJsLoader constructor
         *
         *  @constructor
         */
        constructor: function () {

            this.loaderManager = new THREE.LoadingManager();
            this.initLoaderManagerEvents();

            this.loader = new THREE.ObjectLoader(this.loaderManager);
        },

        /**
         * Load scene
         *
         * @param {string} url
         * @return {THREE.Scene}
         */
        load: function(url){

            var self = this;

            this.loader.load(url, function(data){

                self.trigger(self.events.loaded, data);
            });
        },

        /**
         * Parse scene
         *
         * @param {string} scene
         * @return {THREE.Scene}
         */
        parse: function(scene){

            if (scene instanceof THREE.Scene) {
                console.log(result);
            }

            throw new Error("SceneJsLoader parse not scene object");
        },

        /**
         * Init event for manager
         */
        initLoaderManagerEvents: function () {

            var self = this;

            self.loaderManager.onProgress = function (item, loaded, total) {

                self.trigger(self.events.progress, (loaded * 100) / total); // Calculate percent
            };

            self.loaderManager.onError = function(){

                throw new Error("SceneJsLoader loading error");
            };
        }

    });
});
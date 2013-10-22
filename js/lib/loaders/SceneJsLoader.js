/**
 * Created by akucherenko on 22.10.13.
 */
define(['baseBehaviour', 'three'], function (BaseBehaviour, THREE){

    /**
     * SceneJsLoader object
     *
     *  @class SceneJsLoader
     */
    return BaseBehaviour.extend({

        loaderManager: null,

        loader: null,
        /**
         *  Load
         *
         * @param {string} url
         */
        constructor : function(url) {

            this.loaderManager = new THREE.LoadingManager();
            this.load = new THREE.SceneLoader( manager );

            /*
            var loader = new THREE.ObjectLoader();
            var result = loader.parse( data );

            if ( result instanceof THREE.Scene ) {

                editor.setScene( result );

            } else {

                editor.addObject( result );

            }*/

            this.initEvents();
        },

        initEvents: function(){

            this.loaderManager.onProgress = function ( item, loaded, total ) {

                console.log( item, loaded, total );

            };
        }

    });
});
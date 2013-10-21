/**
 * Created by akucherenko on 16.10.13.
 *
 * Enter point of application;
 * Here we init app, enable backbone history, and define routers
 */
define(['backbone', 'view/SelectScene'], function (Backbone, SelectScene){

    /**
     * Init application
     */
    var initialize = function (){

        // Init main router
        new MainRouter();
    };

    /**
     * Router setup
     */
    var MainRouter = Backbone.Router.extend({

        // Router init
        initialize: function(){

            // Hide loading screen
            $("#loading-mask").remove();

            // Enable history
            Backbone.history.start();
        },

        /**
         * Routers paths
         */
        routes: {
            '': 'selectScene'
        },

        /**
         * Reactions callbacks
         */

        // Home default reaction
        'selectScene': function(){
            new SelectScene().render();
        }
    });
    // End router setup

    // Return public interface
    return { initialize: initialize, router: MainRouter }
});
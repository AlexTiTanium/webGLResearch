/**
 * Created by akucherenko on 16.10.13.
 *
 * Enter point of application;
 * Here we init app, enable backbone history, and define routers
 */
define(['backbone', 'router'], function (Backbone, Router){

    /**
     * Init application
     */
    var initialize = function (){

        // Hide loading screen
        $("#loading-mask").remove();

        // Init main router
        var router = new Router();

        // Create application property in backbone.
        // Sorry for that, but I don`t know how do it right, idea with global window.app object don`t like me
        // This need for access to current router globally
        Backbone.application = {};
        Backbone.application.router = router;

        // Enable history
        Backbone.history.start();
    };

    // Return public interface
    return { initialize: initialize }
});
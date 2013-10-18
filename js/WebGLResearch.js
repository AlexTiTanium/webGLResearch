/**
 * Created by akucherenko on 16.10.13.
 */
define(['backbone'], function (Backbone){

    var initialize = function (){
        //*$("#loading-mask").remove();
        console.log('App start');

        Backbone.history.start();
    };

    return { initialize: initialize }
});
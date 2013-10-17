/**
 * Created by akucherenko on 16.10.13.
 */
define(['Backbone'], function (backbone){

    var initialize = function (){
        //*$("#loading-mask").remove();
        console.log('App start');

        Backbone.history.start();
    };

    return { initialize: initialize }
});
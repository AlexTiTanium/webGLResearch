
/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'baseBehaviour'
], function (BaseBehaviour) {

    /**
     * EventsCenter class
     * This class need for components exchange notification
     *
     *  @class EventsCenter
     */
    return BaseBehaviour.extend({

        /**
         * This list of events, need only for doc
         */
        knownEvents: {

            // Scene events
            "scene:ready": "Scene successful loaded",

            // Loader events
            "loading:progress": "Notify about scene loading progress",
            "loading:error": "Scene loading error, firs argument error message",

            // Engine events
            "update": "Call ~60 times per second, first argument delta time in seconds",
            "render:start": "Fire once on render start",
            "window:resize": "Fire when window has change size"
        }


    });
});

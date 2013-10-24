
/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript'
], function (BaseScript) {

    /**
     * CameraFreeController class
     *
     *  @class CameraFreeController
     */
    return BaseScript.extend({

        /**
         * BaseScript constructor
         *
         * @constructor
         */
        awake: function () {

            console.log(this.object);
            console.log("Camera controller Awake");
        }

    });
});

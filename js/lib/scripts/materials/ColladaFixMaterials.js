/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three',
    'underscore'
], function (BaseScript, THREE, _) {

    /**
     * CustomMaterial class
     *
     *  @class CustomMaterial
     */
    return BaseScript.extend({

        /**
         * Call when script attached to object
         */
        awake: function () {

            var scope = this;

            scope.scene.traverse(function(object){

                if (object instanceof THREE.Mesh) {

                    if(object.material instanceof THREE.MeshPhongMaterial){
                        object.material.side = 0;
                    }
                }
            });
        }

    });
});


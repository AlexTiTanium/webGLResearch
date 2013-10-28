/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three',
    'underscore'
], function (BaseScript, THREE, _) {

    /**
     * Helpers class
     *
     *  @class WireHelpers
     */
    return BaseScript.extend({

        /**
         * Call when script attached to object
         */
        awake: function () {

            var scope = this;

            this.config.drawWire = this.config.drawWire || true;
            this.config.drawVertexNormals = this.config.drawVertexNormals || true;
            this.config.drawFacesNormals = this.config.drawFacesNormals || true;
            this.config.boxHelper = this.config.boxHelper || true;
            this.config.names = this.config.names || [];

            scope.scene.traverse(function(object){

                if( object.material ) {
                    object.material.side = THREE.DoubleSide;
                }

                if (object instanceof THREE.Mesh) {

                    object.geometry.computeFaceNormals();
                    object.geometry.computeVertexNormals();

                    if(!_.isEmpty(scope.config.names) && !_.contains(scope.config.names, object.name)){
                        return;
                    }

                    scope.drawWireFrame(object);
                    scope.drawVertexNormals(object);
                    scope.drawFacesNormals(object);
                    scope.addBoxHelper(object);

                }
            });

        },

        /**
         *
         * @param mesh
         */
        drawWireFrame: function(mesh){

            if(!this.config.drawWire){ return; }

            var helper = new THREE.WireframeHelper(mesh);

            helper.material.depthTest = false;
            helper.material.opacity = 0.25;
            helper.material.transparent = true;

            this.scene.add(helper);
        },

        /**
         *
         * @param mesh
         */
        drawVertexNormals: function(mesh){

            if(!this.config.drawVertexNormals){ return; }

            this.scene.add(new THREE.VertexNormalsHelper(mesh, 10));
        },

        /**
         *
         * @param mesh
         */
        drawFacesNormals: function(mesh){

            if(!this.config.drawFacesNormals){ return; }

            this.scene.add( new THREE.FaceNormalsHelper(mesh,10));
        },

        /**
         *
         * @param mesh
         */
        addBoxHelper: function(mesh){

            if(!this.config.boxHelper){ return; }

            this.scene.add(new THREE.BoxHelper(mesh));
        }

    });
});

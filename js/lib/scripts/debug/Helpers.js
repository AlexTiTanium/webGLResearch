/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three',
    'underscore',
    'keyboard'
], function (BaseScript, THREE, _, Keyboard) {

    /**
     * Helpers class
     *
     *  @class WireHelpers
     */
    return BaseScript.extend({

        /**
         * Here we save current displayed helpers, for future remove
         */
        helpersCollection: [],

        /**
         * Current status
         */
        isEnabled: false,

        /**
         * Here we save current displayed helpers, for future remove
         */
        normalsHelperCollection: [],

        /**
         * Status normal helper
         */
        isDrawNormalsEnable: false,

        /**
         * Call when script attached to object
         */
        awake: function () {

            this.config.names = this.config.names || [];

            var scope = this;

            Keyboard.bind('z z', function(){

                if(scope.isEnabled){
                    scope.disable();
                }else{
                    scope.enable();
                }

            });

            Keyboard.bind('n n', function(){

                if(scope.isDrawNormalsEnable){
                    scope.disableNormals();
                }else{
                    scope.enableNormals();
                }

            });
        },

        /**
         * Enable
         */
        enable: function(){

            var scope = this;

            this.addAxisHelper();

            scope.scene.traverse(function(object){

                if(object instanceof THREE.Camera){

                    scope.addCameraHelper(object);
                    return
                }

                if(object instanceof THREE.DirectionalLight){

                    scope.addDirectionalLightHelper(object);
                    return;
                }

                if(object instanceof THREE.PointLight){

                    scope.addPointLightHelper(object);
                    return;
                }

                if (object instanceof THREE.Mesh) {

                    if(!_.isEmpty(scope.config.names) && !_.contains(scope.config.names, object.name)){
                        return;
                    }

                    scope.drawWireFrame(object);
                    scope.addBoxHelper(object);
                }
            });

            scope.isEnabled = true;
        },


        /**
         * Disable all helpers
         */
        disable: function(){

            var scope = this;

            _.each(scope.helpersCollection, function(helper){

                scope.scene.remove(helper);
            });

            scope.helpersCollection = [];

            scope.isEnabled = false;
        },

        /**
         * Enable normals draw
         */
        enableNormals: function(){

            var scope = this;

            scope.scene.traverse(function(object){

                if (object instanceof THREE.Mesh) {

                    if(!_.isEmpty(scope.config.names) && !_.contains(scope.config.names, object.name)){
                        return;
                    }

                    scope.drawVertexNormals(object);
                    scope.drawFacesNormals(object);
                }
            });

            scope.isDrawNormalsEnable = true;
        },

        /**
         * DisableNormals normals draw
         *
         */
        disableNormals: function(){

            var scope = this;

            _.each(scope.normalsHelperCollection, function(helper){

                scope.scene.remove(helper);
            });

            scope.helpersCollection = [];

            scope.isDrawNormalsEnable = false;
        },

        /**
         * Enable normals draw
         *
         * @param mesh
         */
        drawWireFrame: function(mesh){

            var helper = new THREE.WireframeHelper(mesh);

            helper.material.depthTest = false;
            helper.material.opacity = 0.25;
            helper.material.transparent = true;

            this.helpersCollection.push(helper);

            this.scene.add(helper);
        },

        /**
         *
         * @param mesh
         */
        drawVertexNormals: function(mesh){

            var helper = new THREE.VertexNormalsHelper(mesh, 1, false, 0.1);

            this.normalsHelperCollection.push(helper);
            this.scene.add(helper);
        },

        /**
         *
         * @param mesh
         */
        drawFacesNormals: function(mesh){

            var helper = new THREE.FaceNormalsHelper(mesh, 1, false, 0.1);

            this.normalsHelperCollection.push(helper);
            this.scene.add(helper);
        },

        /**
         *
         * @param mesh
         */
        addBoxHelper: function(mesh){

            var helper = new THREE.BoxHelper(mesh);

            this.helpersCollection.push(helper);
            this.scene.add(helper);
        },

        /**
         *
         *
         */
        addAxisHelper: function(){

            var helper = new THREE.AxisHelper(100);

            this.helpersCollection.push(helper);
            this.scene.add(helper);
        },

        /**
         *
         * @param camera
         */
        addCameraHelper: function(camera){

            var helper = new THREE.CameraHelper(camera);

            this.helpersCollection.push(helper);
            this.scene.add(helper);
        },

        /**
         *
         * @param light
         */
        addDirectionalLightHelper: function(light){

            var helper = new THREE.DirectionalLightHelper(light, 10);

            this.helpersCollection.push(helper);
            this.scene.add(helper);
        },

        /**
         *
         * @param light
         */
        addPointLightHelper: function(light){

            var helper = new THREE.PointLightHelper(light, 10);

            this.helpersCollection.push(helper);
            this.scene.add(helper);
        }
    });
});

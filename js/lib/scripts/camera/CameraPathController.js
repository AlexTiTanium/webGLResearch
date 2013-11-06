/**
 * Created by akucherenko on 22.10.13.
 */
define([
    'lib/BaseScript',
    'three',
    'keyboard',
    'mouse'
], function (BaseScript, THREE, Keyboard, Mouse) {

    /**
     * CameraFirstPersonController class
     *
     *  @class CameraFirstPersonController
     */
    return BaseScript.extend({

        /**
         * Wrapped camera object, used for yaw rotation
         */
        camera: new THREE.Object3D(),

        /**
         * We need change camera origin, use for pinch rotation
         */
        cameraWrapper: new THREE.Object3D(),

        /**
         * Velocity handle
         */
        velocity: new THREE.Vector3(),

        /**
         * Velocity friction, strongly recommend 0.08
         *
         * @property {float} velocityFriction
         */
        velocityFriction: 0.9,

        /**
         * Speed, units in second
         *
         * @property {number} speed
         */
        speed: 15,

        /**
         *
         */
        waypoints: [],

        sortedObjects: [],

        pathObjects: [],

        spline: null,

        /**
         * Call when script attached to object
         */
        awake: function () {

            var scope = this;
            var position = this.config.position || [0,0,0];

            this.object.rotation.set(0,0,0);
            this.object.position.set(0,0,0);

            // Remove camera from scene
            this.scene.remove(this.object);

            // And wrap camera to 3d object for saving rotation
            this.camera.add(this.object);
            this.cameraWrapper.add(this.camera);

            // Setup camera
            this.cameraWrapper.position.fromArray(position);

            // Add wrapped camera to the scene
            this.scene.add(this.cameraWrapper);

            // Subscribe for render loop
            //this.events.on("update", this.update.bind(this));

            this.scene.traverse(function(object){
                if(object.name.substring(0,11) == "WalkPath1-0"){
                    scope.pathObjects.push(object);
                }
            });

            scope.sortedObjects = _.sortBy(scope.pathObjects, function(object){
                return parseInt(object.name.substring(10));
            });

            _.forEach(scope.sortedObjects, function(object){
                scope.waypoints.push(object.position.toArray());
            });

            console.log(scope.waypoints);

            this.init();
        },

        /**
         *
         */
        init: function(){

            var spline = this.createSpline(this.waypoints);
            var animation = this.createAnimation(spline);


        },

        /**
         *
         */
        createSpline: function(waypoints){

            var spline = new THREE.Spline();
            spline.initFromArray(waypoints);

            spline.reparametrizeByArcLength(50);

            return spline;
        },

        /**
         *
         */
        createAnimation: function(spline){

            // array with triplets of x, y, z coordinates that correspond to the current control points
            var path = spline.getControlPointsArray();
            var pathLength = path.length;
            var splineLength = spline.getLength();

            console.log(splineLength);

            console.log(path);

            var animationConfig = {
                name: "Default",
                fps: 0.6,

                length: 28,

                hierarchy: []
            };

            var timeline = { parent: -1, keys: [] };

        },


        /**
         *  Call before render
         */
        start: function(){

            // Event binding
            //this.enableKeyboardEvents();
            //this.enableMouseEvents();
        },

        /**
         * Call every render tick
         *
         * @property {float} delta in seconds
         */
        update: function(delta){


        }

    });
});

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
         * This object will be animate
         */
        target: new THREE.Object3D(),

        /**
         * This object will be animate
         */
        cameraPosition: new THREE.Object3D(),

        /**
         * Speed animation
         */
        duration: 28,

        /**
         * Animation Control Object
         */
        animationCamera: null,

        /**
         * Animation Control Object
         */
        animationTarget: null,

        /**
         * Call when script attached to object
         */
        awake: function () {

            var position = this.config.position || [0,0,0];

            this.object.rotation.set(0,0,0);
            this.object.position.set(0,5.5,0);

            // Subscribe for render loop
            this.events.on("update", this.update.bind(this));

            this.init();
        },

        /**
         * Init animation
         */
        init: function(){

            var waypoints = this.getWayPointsArray("WalkPath1-0");
            var spline = this.createSpline(waypoints);

            // Set start position
            this.object.position.x = waypoints[0][0];
            this.object.position.z = waypoints[0][2];

            this.animationTarget = this.createAnimation(this.target, "target", spline);
            this.animationCamera = this.createAnimation(this.cameraPosition, "camera", spline);
        },

        /**
         * Get waypoints
         */
        getWayPointsArray: function(prefix){

            var pathObjects = [], sortedObjects = [], waypoints = [];

            this.scene.traverse(function(object){
                if(object.name.substring(0,prefix.length) == prefix){
                    pathObjects.push(object);
                }
            });

            sortedObjects = _.sortBy(pathObjects, function(object){
                return parseInt(object.name.substring(prefix.length));
            });

            _.forEach(sortedObjects, function(object){

                var vector = new THREE.Vector3();
                vector.getPositionFromMatrix(object.matrixWorld);
                waypoints.push(vector.toArray());
            });

            return waypoints;
        },

        /**
         * Create spline
         */
        createSpline: function(waypoints){

            var spline = new THREE.Spline();
            spline.initFromArray(waypoints);

            spline.reparametrizeByArcLength(200);

            return spline;
        },

        /**
         * Generate animation time line
         */
        createAnimation: function(object, name, spline){

            var i, time;

            // array with triplets of x, y, z coordinates that correspond to the current control points
            var path = spline.getControlPointsArray();

            // How many points in path
            var pathLength = path.length;
            var splineLength = spline.getLength();

            // Duration
            var duration = this.duration;

            // Array of distances from firs point
            // 0: 0
            // 1: 146.7
            // 2: 356.4
            // 3: 804.0
            // ...
            var chunksDistances = splineLength.chunks;
            var totalDistance = splineLength.total;

            var animationConfig = {
                name: name,
                fps: 0.6,

                length: duration,

                hierarchy: []
            };

            var timeLine = { parent: -1, keys: [] };

            // First frame
            timeLine.keys[0] =              { time: 0,             pos: path[0],               rot: [0,0,0,1], scl:[1,1,1]};
            timeLine.keys[pathLength-1] =   { time: duration,      pos: path[pathLength-1],    rot: [0,0,0,1], scl:[1,1,1]};

            // Generate key frames
            for(i = 1; i < pathLength; i++){

                // real distance (approximation via linear segments)
                time = duration * chunksDistances[i] / totalDistance;

                // Create frame
                timeLine.keys[i] = { time: time, pos: path[i], rot: [0,0,0,1], scl:[1,1,1] };
            }

            // Set timeLine
            animationConfig.hierarchy[0] = timeLine;

            THREE.AnimationHandler.add(animationConfig);

            return new THREE.Animation(object, name, THREE.AnimationHandler.CATMULLROM_FORWARD);
        },

        /**
         *  Call before render
         */
        start: function(){

            // Begin animation playing
            this.animationTarget.play(false, 3);
            this.animationCamera.play(false, 0);
        },

        /**
         * Call every render tick
         *
         * @property {float} delta in seconds*/

        update: function(delta){

            this.object.lookAt(this.target.position);

            this.object.position.z = this.cameraPosition.position.z;
            this.object.position.x = this.cameraPosition.position.x;
        }

    });
});

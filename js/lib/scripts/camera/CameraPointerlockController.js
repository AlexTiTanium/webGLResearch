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
     * CameraPointerlockController class
     *
     *  @class CameraPointerlockController
     */
    return BaseScript.extend({

        /**
         * Wrapped camera object
         */
        camera: new THREE.Object3D(),

        /**
         * We need change camera origin
         */
        cameraWrapper: new THREE.Object3D(),

        /**
         * Velocity handle
         */
        velocity: new THREE.Vector3(),

        /**
         * Direction set
         */
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,

        /**
         * Velocity friction, strongly recommend 0.08
         *
         * @property {float} velocityFriction
         */
        velocityFriction: 0.08,

        /**
         * Acceleration, change for add more speed
         *
         * @property {float} acceleration
         */
        acceleration: 1.50,

        /**
         * Precalculated half PI
         */
        PI_2: Math.PI / 2,

        /**
         * Call when script attached to object
         */
        awake: function () {

            this.object.rotation.set(0,0,0);

            // Remove camera from scene
            this.scene.remove(this.object);

            // And wrap camera to 3d object for saving rotation
            this.camera.add(this.object);

            // Change camera origin
            //this.cameraWrapper.position.y = 10;
            this.cameraWrapper.add(this.camera);

            // Add wrapped camera to the scene
            this.scene.add(this.cameraWrapper);

            // Subscribe for render loop
            this.engine.on("update", this.update.bind(this));

            // Event binding
            this.enableKeyboardEvents();
            this.enableMouseEvents();
        },

        /**
         *  Bind keyboard
         */
        enableKeyboardEvents: function(){

            var scope = this;

            // Forward
            Keyboard.bind(['w', 'up'], function(){ scope.moveForward = true; });
            Keyboard.bind(['w', 'up'], function(){ scope.moveForward = false; }, 'keyup');

            // Backward
            Keyboard.bind(['s', 'down'], function(){ scope.moveBackward = true; });
            Keyboard.bind(['s', 'down'], function(){ scope.moveBackward = false; }, 'keyup');

            // Left
            Keyboard.bind(['a', 'left'], function(){ scope.moveLeft = true; });
            Keyboard.bind(['a', 'left'], function(){ scope.moveLeft = false; }, 'keyup');

            // Right
            Keyboard.bind(['d', 'right'], function(){ scope.moveRight = true; });
            Keyboard.bind(['d', 'right'], function(){ scope.moveRight = false; }, 'keyup');
        },

        /**
         * Bind mouse
         */
        enableMouseEvents: function(){

            var scope = this;

            Mouse.on('drag', function(event){

                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

                //console.log(movementX);

                //scope.cameraWrapper.rotation.y -= movementX * 0.002;
                scope.cameraWrapper.rotation.x -= movementY * 0.002;

                scope.cameraWrapper.rotation.x = Math.max(-scope.PI_2, Math.min(scope.PI_2, scope.cameraWrapper.rotation.x));
            });
        },

        /**
         * Call every render tick
         */
        update: function(delta){

            //console.log(this.velocity);

            // Velocity calculation
            this.velocity.x += ( - this.velocity.x ) * this.velocityFriction * delta;
            this.velocity.z += ( - this.velocity.z ) * this.velocityFriction * delta;

            // Direction move
            if ( this.moveLeft )        this.velocity.x -= this.acceleration * delta;
            if ( this.moveRight )       this.velocity.x += this.acceleration * delta;

            if ( this.moveForward )     this.velocity.z -= this.acceleration * delta;
            if ( this.moveBackward )    this.velocity.z += this.acceleration * delta;

            // Object update position
            this.cameraWrapper.translateX(this.velocity.x);
            this.cameraWrapper.translateZ(this.velocity.z);
        }

    });
});

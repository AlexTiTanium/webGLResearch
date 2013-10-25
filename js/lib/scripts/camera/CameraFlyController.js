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
     * CameraFlyController class
     *
     *  @class CameraFlyController
     */
    return BaseScript.extend({


        movementSpeed : 1.0,

        rollSpeed: 0.005,

        moveVector: new THREE.Vector3( 0, 0, 0 ),
        rotationVector: new THREE.Vector3( 0, 0, 0 ),

        tmpQuaternion: new THREE.Quaternion(),

        moveState: { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 },

        /**
         * Call when script attached to object
         */
        awake: function () {



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
            Keyboard.bind(['w', 'up'], function(){ scope.moveState.forward = 1; });
            Keyboard.bind(['w', 'up'], function(){ scope.moveState.forward = 0; }, 'keyup');

            // Backward
            Keyboard.bind(['s', 'down'], function(){ scope.moveState.back = 1; });
            Keyboard.bind(['s', 'down'], function(){scope.moveState.back = 0; }, 'keyup');

            // Left
            Keyboard.bind(['a', 'left'], function(){ scope.moveState.left = 1; });
            Keyboard.bind(['a', 'left'], function(){ scope.moveState.left = 0; }, 'keyup');

            // Right
            Keyboard.bind(['d', 'right'], function(){ scope.moveState.right = 1; });
            Keyboard.bind(['d', 'right'], function(){ scope.moveState.right = 0; }, 'keyup');


            Mousetrap.bind([''], function() {
                console.log('konami code');
            });
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

            var moveMult = delta * this.movementSpeed;
            var rotMult = delta * this.rollSpeed;

            this.object.translateX( this.moveVector.x * moveMult );
            this.object.translateY( this.moveVector.y * moveMult );
            this.object.translateZ( this.moveVector.z * moveMult );

            this.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
            this.object.quaternion.multiply( this.tmpQuaternion );

            // expose the rotation vector for convenience
            this.object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );
        },


        updateMovementVector: function() {

            var forward = ( this.moveState.forward || ( this.autoForward && !this.moveState.back ) ) ? 1 : 0;

            this.moveVector.x = ( -this.moveState.left    + this.moveState.right );
            this.moveVector.y = ( -this.moveState.down    + this.moveState.up );
            this.moveVector.z = ( -forward + this.moveState.back );

            //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

        },

        updateRotationVector: function() {

            this.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp );
            this.rotationVector.y = ( -this.moveState.yawRight  + this.moveState.yawLeft );
            this.rotationVector.z = ( -this.moveState.rollRight + this.moveState.rollLeft );

            //console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

        }
    });
});

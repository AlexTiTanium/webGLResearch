
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
         * Precalculated half PI
         */
        PI_2: Math.PI / 2,

        /**
         * Call when script attached to object
         */
        awake: function () {

            // Subscribe for render loop
            this.engine.on("update", this.update.bind(this));

            Mouse.on('move', function(){
                //console.log(this);
            });

            this.initKeyboard();
        },

        /**
         *  Bind keyboard
         */
        initKeyboard: function(){

            var self = this;

            // Forward
            Keyboard.bind(['w', 'up'], function(){ self.moveForward = true; });
            Keyboard.bind(['w', 'up'], function(){ self.moveForward = false; }, 'keyup');

            // Backward
            Keyboard.bind(['s', 'down'], function(){ self.moveBackward = true; });
            Keyboard.bind(['s', 'down'], function(){ self.moveBackward = false; }, 'keyup');

            // Left
            Keyboard.bind(['a', 'left'], function(){ self.moveLeft = true; });
            Keyboard.bind(['a', 'left'], function(){ self.moveLeft = false; }, 'keyup');

            // Right
            Keyboard.bind(['d', 'right'], function(){ self.moveRight = true; });
            Keyboard.bind(['d', 'right'], function(){ self.moveRight = false; }, 'keyup');
        },

        /**
         * Call every render tick
         */
        update: function(delta){

            //console.log(delta);

            var magic1 = 0.08;
            var magic2 = 0.50;

            //console.log(this.velocity);

            // Velocity calculation
            this.velocity.x += ( - this.velocity.x ) * magic1 * delta;
            this.velocity.z += ( - this.velocity.z ) * magic1 * delta;
            this.velocity.y -= 0.25 * delta;

            // Direction move
            if ( this.moveForward )     this.velocity.z -= magic2 * delta;
            if ( this.moveBackward )    this.velocity.z += magic2 * delta;
            if ( this.moveLeft )        this.velocity.x -= magic2 * delta;
            if ( this.moveRight )       this.velocity.x += magic2 * delta;

            // Object update position
            this.object.translateX(this.velocity.x);
            this.object.translateZ(this.velocity.z);

            //if(this.velocity.x < 0.1) this.velocity.x = 0;
            //if(this.velocity.z < 0.1) this.velocity.z = 0;
        }

    });
});

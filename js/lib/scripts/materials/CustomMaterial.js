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

            var material = null;

            // Or phong basic lambert
            var shader = this.config.shader || "lambert";
            var color = this.config.color || 0xffffff;
            var name = this.config.name || 'empty';

            var ambient = this.config.ambient || false;
            var specular = this.config.specular || false;
            var transparent = this.config.transparent || false;
            var shininess = this.config.shininess || false;
            var reflectivity = this.config.reflectivity || false;
            var useEnvMap = this.config.useEnvMap || false;
            var opacity = this.config.opacity || false;
            var combine = this.config.combine || false;

            var materialConfig = {
                color: color,
                ambient: ambient,
                specular: specular,
                transparent: transparent,
                shininess: shininess,
                envMap: useEnvMap ? this.scene.skyBoxTexture : false,
                opacity: opacity,
                reflectivity: reflectivity
            };

            switch(combine){
                case 'mix':         materialConfig.combine =  THREE.MixOperation;       break;
                case 'multiply':    materialConfig.combine =  THREE.MultiplyOperation;  break;
                case 'add':         materialConfig.combine =  THREE.AddOperation;       break;
            }

            var filtredMaterialConfig = {};
            _.each(materialConfig, function(value, key){
                if(value !== false){
                    filtredMaterialConfig[key] = value;
                }
            });

            switch(shader){
                case 'lambert': material = new THREE.MeshLambertMaterial(filtredMaterialConfig); break;
                case 'phong': material = new THREE.MeshPhongMaterial(filtredMaterialConfig);     break;
                case 'basic': material = new THREE.MeshBasicMaterial(filtredMaterialConfig);     break;
                default: console.warn("Shader " + shader + " not found"); break;
            }

            if(this.object.material instanceof THREE.MeshFaceMaterial){

                var materials = this.object.material.materials;

                var matIndex = _.findIndex(materials, { 'name': name });

                if(matIndex != -1){
                    materials[matIndex] = material;
                }else{
                    console.warn("Material " + name + " not found on " + this.object.name);
                }

            }else{
                this.object.material = material;
            }
        }
    });
});


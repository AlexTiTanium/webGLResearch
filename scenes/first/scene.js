{

"metadata" :
{
	"formatVersion" : 3.2,
	"type"          : "scene",
	"sourceFile"    : "scene.blend",
	"generatedBy"   : "Blender 2.66 Exporter",
	"objects"       : 3,
	"geometries"    : 3,
	"materials"     : 11,
	"textures"      : 3
},

"urlBaseType" : "relativeToScene",


"objects" :
{
	"Building10" : {
		"geometry"  : "geo_Building",
		"groups"    : [  ],
		"material"  : "Build10",
		"position"  : [ 37.0488, 1.31596e-06, -38.4462 ],
		"rotation"  : [ -1.5708, 0, 0 ],
		"quaternion": [ -0.707107, 0, 0, 0.707107 ],
		"scale"     : [ 0.1, 0.1, 0.1 ],
		"visible"       : true,
		"castShadow"    : false,
		"receiveShadow" : false,
		"doubleSided"   : false
	},

	"obj1" : {
		"geometry"  : "geo_obj1.001",
		"groups"    : [  ],
		"material"  : "",
		"position"  : [ -22.8919, 2.89769, 0.0623687 ],
		"rotation"  : [ -1.5708, 0, 0 ],
		"quaternion": [ -0.707107, 0, 0, 0.707107 ],
		"scale"     : [ 1, 1, 1 ],
		"visible"       : true,
		"castShadow"    : false,
		"receiveShadow" : false,
		"doubleSided"   : false
	},

	"Plane" : {
		"geometry"  : "geo_Plane.001",
		"groups"    : [  ],
		"material"  : "Material.001",
		"position"  : [ 0, 0, 0 ],
		"rotation"  : [ -1.5708, 0, 0 ],
		"quaternion": [ -0.707107, 0, 0, 0.707107 ],
		"scale"     : [ 60, 60, 1 ],
		"visible"       : true,
		"castShadow"    : false,
		"receiveShadow" : false,
		"doubleSided"   : false
	}
},


"geometries" :
{
	"geo_Building" : {
		"type" : "ascii",
		"url"  : "scene.Building.js"
	},

	"geo_obj1.001" : {
		"type" : "ascii",
		"url"  : "scene.obj1.001.js"
	},

	"geo_Plane.001" : {
		"type" : "ascii",
		"url"  : "scene.Plane.001.js"
	}
},


"textures" :
{
	"Concrete03_n_2.jpg.001" : {
		"url": "Concrete03_n_2.jpg",
        "wrap": ["repeat", "repeat"]
	},

	"MountainGrass.jpg" : {
		"url": "MountainGrass.jpg",
        "wrap": ["repeat", "repeat"]
	},

	"Build10.jpg" : {
		"url": "Build10.jpg",
        "wrap": ["repeat", "repeat"]
	}
},


"materials" :
{
	"black.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 1710618, "opacity": 1, "blending": "NormalBlending" }
	},

	"black2.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 0, "opacity": 1, "blending": "NormalBlending" }
	},

	"Body.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 3762294, "opacity": 1, "blending": "NormalBlending" }
	},

	"glass.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 3362638, "opacity": 0.34, "transparent": true, "blending": "NormalBlending" }
	},

	"Interieur.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 1710618, "opacity": 1, "blending": "NormalBlending" }
	},

	"Build10" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 13421772, "opacity": 1, "map": "Build10.jpg", "blending": "NormalBlending" }
	},

	"Material.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 10724259, "opacity": 1, "map": "MountainGrass.jpg", "blending": "NormalBlending" }
	},

	"mirror.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 5000268, "opacity": 1, "blending": "NormalBlending" }
	},

	"mizo.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 0, "opacity": 1, "blending": "NormalBlending" }
	},

	"tire.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 4539715, "opacity": 1, "blending": "NormalBlending" }
	},

	"tireling.001" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 8355711, "opacity": 1, "blending": "NormalBlending" }
	}
},


"transform" :
{
	"position"  : [ 0, 0, 0 ],
	"rotation"  : [ -1.5708, 0, 0 ],
	"scale"     : [ 1, 1, 1 ]
},

"defaults" :
{
	"bgcolor" : [ 0, 0, 0 ],
	"bgalpha" : 1.000000,
	"camera"  : ""
}

}

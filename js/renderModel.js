import * as THREE from './build/three.module.js';
import { GLTFLoader } from './three/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three/jsm/controls/OrbitControls.js';


var scene, camera, renderer, controls;

var WRAP_WIDTH;
var WRAP_HEIGHT;
var mouseX = 0;
var mouseY = 0;

var canvas = document.querySelector('#canvas_3d');
var renderer = new THREE.WebGLRenderer({
   canvas,
   alpha: true,
 });


var canvasContainer = "canvas_wrap";

function initRender()
{
	var kv_wrap_width = document.getElementById(canvasContainer).clientWidth;
	var kv_wrap_aspect = WindowResizeAspectRatio(kv_wrap_width);


	scene = new THREE.Scene();


	renderer.setSize( kv_wrap_width, kv_wrap_width * kv_wrap_aspect );
	//scene.background = new THREE.Color( 0x000000 );

	camera = new THREE.PerspectiveCamera( 45, kv_wrap_width / (kv_wrap_width * kv_wrap_aspect), 1, 1000 );

	controls = new OrbitControls( camera, renderer.domElement );
	controls.autoRotate = true;
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.minPolarAngle = Math.PI/2.5;
	controls.maxPolarAngle = Math.PI/1.75;
	controls.rotateSpeed = .25;

	camera.position.set( 1, -1, 2.5 );
	//camera.up.set(0,0,0);
	//camera.lookAt( 0, 0, 0 );

	/*
	renderer = new THREE.WebGLRenderer();
	$("#kv_wrap").append( renderer.domElement );
	*/

	/*
	var dirLight = new THREE.DirectionalLight( 0x777777, 5 );
	dirLight.position.set( 8, 8, 8 );
	scene.add( dirLight );
	*/

	var light = new THREE.PointLight(0xffffff, 2.5);
	light.position.set( 8, 20, 15 );
	light.castShadow = true;
	light.shadow.radius = 20;
	scene.add( light );


	var light2 = new THREE.PointLight(0xffffff, 1.5);
	light2.position.set( 8, 15, -15 );
	light2.castShadow = true;
	light2.shadow.radius = 20;
	scene.add( light2 );
	//scene.fog = new THREE.Fog( 0x6a8b8f, 0.5, 1000 );


	var loader = new GLTFLoader();
	loader.load( 'model/mech.glb', function ( gltf ) {
		scene.add( gltf.scene );
	}, undefined, function ( error ) {
		console.error( error );
	} );


	animate();
}








function animate() {

	requestAnimationFrame( animate );

	controls.update();

	/*
	camera.lookAt( (mouseX * .001), (mouseY * -.001), 0 );
	camera.position.x = 0 + (mouseX * -.002);
	camera.position.y = -.5 + (mouseY * .002);

	*/
	renderer.render( scene, camera );


};




//Events
$(document).ready(function () {

	initRender();

	//window.addEventListener("scroll", onScroll, false);
	updateWrapWidthHeight();
	window.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);

	document.getElementById(canvasContainer).style.visibility = "visible";
	document.getElementById('canvas_3d').style.display = "block";


});



//Add custom codes to Javascript Events
function onMouseMove(event)
{
	MouseMoveModel(event);
};
function onWindowResize()
{
	WindowResizeModel();
}



//Events Handling
function MouseMoveModel(event)
{
	mouseX = (event.clientX - (WRAP_WIDTH / 2)) / 4;
	mouseY = (event.clientY - (WRAP_HEIGHT / 2)) / 8;

};


function WindowResizeModel() {

	var kv_wrap_width = document.getElementById(canvasContainer).clientWidth;
	var kv_wrap_aspect = WindowResizeAspectRatio(kv_wrap_width);


	camera.aspect = kv_wrap_width / (kv_wrap_width * kv_wrap_aspect);
	camera.updateProjectionMatrix();

	renderer.setSize( kv_wrap_width, (kv_wrap_width * kv_wrap_aspect) );


}

function WindowResizeAspectRatio(kv_wrap_width)
{
	return (kv_wrap_width > 800) ? .5 : .85;
}


function updateWrapWidthHeight()
{
	WRAP_WIDTH = $("#kv_wrap").width();
	WRAP_HEIGHT = $("#kv_wrap").height();
}

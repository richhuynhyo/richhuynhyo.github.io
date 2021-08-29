import * as THREE from './build/three.module.js';
import { GLTFLoader } from './three/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three/jsm/controls/OrbitControls.js';


var scene, camera, renderer;

var WRAP_WIDTH;
var WRAP_HEIGHT;
var mouseX = 0;
var mouseY = 0;

var canvas = document.querySelector('#canvas_3d');
var renderer = new THREE.WebGLRenderer({
   canvas,
   alpha: true,
 });



function initRender()
{
	var kv_wrap_width = document.getElementById('kv_wrap').clientWidth;
	var kv_wrap_aspect = (kv_wrap_width > 800) ? .5625 : 1.25;


	scene = new THREE.Scene();


	renderer.setSize( kv_wrap_width, kv_wrap_width * kv_wrap_aspect );
	//scene.background = new THREE.Color( 0x000000 );

	camera = new THREE.PerspectiveCamera( 45, kv_wrap_width / (kv_wrap_width * kv_wrap_aspect), 1, 1000 );

	//const controls = new OrbitControls( camera, renderer.domElement );

	camera.position.set( 0, 0, 1.75 );
	camera.lookAt( 0, 0, 0 );

	/*
	renderer = new THREE.WebGLRenderer();
	$("#kv_wrap").append( renderer.domElement );
	*/

	/*
	var dirLight = new THREE.DirectionalLight( 0x777777, 5 );
	dirLight.position.set( 8, 8, 8 );
	scene.add( dirLight );
	*/

	var light = new THREE.PointLight(0xffffff, 3.5);
	light.position.set( 8, 20, 15 );
	light.castShadow = true;
	light.shadow.radius = 20;
	scene.add( light );

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

	//controls.update();

	camera.lookAt( (mouseX * .0005), (mouseY * -.0005), 0 );
	camera.position.x = 0 + (mouseX * -.0015);
	camera.position.y = -.5 + (mouseY * .0015);


	renderer.render( scene, camera );

};




//Events
$(document).ready(function () {

	initRender();

	//window.addEventListener("scroll", onScroll, false);
	updateWrapWidthHeight();
	window.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);

	document.getElementById('kv_wrap').style.visibility = "visible";

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

	var kv_wrap_width = document.getElementById('kv_wrap').clientWidth;
	var kv_wrap_aspect = (kv_wrap_width > 800) ? .5625 : 1.25;


	camera.aspect = kv_wrap_width / (kv_wrap_width * kv_wrap_aspect);
	camera.updateProjectionMatrix();

	renderer.setSize( kv_wrap_width, (kv_wrap_width * kv_wrap_aspect) );


}


function updateWrapWidthHeight()
{
	WRAP_WIDTH = $("#kv_wrap").width();
	WRAP_HEIGHT = $("#kv_wrap").height();
}

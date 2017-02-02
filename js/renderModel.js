var container;
var camera, scene;
var canvasRenderer, webglRenderer;
var mesh, zmesh, geometry;


function initModel()
{

	//CAMERA AND SCENE
	camera = new THREE.PerspectiveCamera(75, WRAP_WIDTH / WRAP_HEIGHT, 1, 100000);
	camera.position.z = 20;
	scene = new THREE.Scene();

	// LIGHTS
	var ambient = new THREE.AmbientLight(0x222222);
	scene.add(ambient);
	var directionalLight = new THREE.DirectionalLight(0xCCCCCC);
	directionalLight.position.set(0, 40, 100).normalize();
	scene.add(directionalLight);

	//RENDERER
	webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	webglRenderer.setSize(WRAP_WIDTH, WRAP_HEIGHT);
	webglRenderer.domElement.style.position = "relative";

	//SET CONTAINER
	$("#mech_wrap").append(webglRenderer.domElement);

	//LOAD MODEL AND UV
	var loader = new THREE.JSONLoader();
	var callbackKey = function (geometry) { createScene(geometry, 0, 0, 0, 2, "model/testUV.jpg") };
	loader.load("model/figure.js", callbackKey);
}


function createScene(geometry, x, y, z, scale, tmap)
{
	var materials = [
		new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture(tmap) }),
		new THREE.MeshPhongMaterial({ opacity: 0.25, transparent: true }),
		new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture(tmap) })
	];
	figureMesh = new THREE.Mesh(geometry, new THREE.MultiMaterial(materials));
	figureMesh.position.set(x, y, z);
	figureMesh.scale.set(scale, scale, scale);
	scene.add(figureMesh);
}
function render()
{
	//CAMERA
	camera.position.x = (mouseX) * -.1;
	camera.position.y = (mouseY) * .1;
	camera.lookAt(scene.position);
	webglRenderer.render(scene, camera);
}
function animateModel()
{
	requestAnimationFrame(animateModel);
	render();
}



function MouseMoveModel(event)
{
	mouseX = (event.clientX - (WRAP_WIDTH / 2)) / 4;
	mouseY = (event.clientY - (WRAP_HEIGHT / 2)) / 8;
};
function WindowResizeModel() {
	updateWrapWidthHeight();
	camera.aspect = WRAP_WIDTH / WRAP_HEIGHT;
	camera.updateProjectionMatrix();
	webglRenderer.setSize(WRAP_WIDTH, WRAP_HEIGHT);
}
function updateWrapWidthHeight()
{
	WRAP_WIDTH = $("#mech_wrap").width();
	WRAP_HEIGHT = $("#mech_wrap").height();
}





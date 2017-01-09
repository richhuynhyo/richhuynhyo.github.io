var container;
var camera, scene;
var canvasRenderer, webglRenderer;
var mesh, zmesh, geometry;

function initModel() {

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
	var callbackKey = function (geometry) { createScene(geometry, 0, -5, 0, 3, "model/mechUV.jpg") };
	loader.load("model/mech.js", callbackKey);

	//ADD EVENT LISTENERS
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('mousemove', onMouseMove, false);

}


function createScene(geometry, x, y, z, scale, tmap) {
	zmesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture(tmap) }));
	zmesh.position.set(x, y, z);
	zmesh.scale.set(scale, scale, scale);
	scene.add(zmesh);
}
function render() {
	camera.position.x = (mouseX) * -.025;
	camera.position.y = (mouseY) * .025;
	camera.lookAt(scene.position);
	webglRenderer.render(scene, camera);
}
function animateModel() {
	requestAnimationFrame(animateModel);
	render();
}
function onMouseMove(event)
{
	mouseX = (event.clientX - (WRAP_WIDTH / 2)) / 4;
	mouseY = (event.clientY - (WRAP_HEIGHT / 2)) / 8;
};
function onWindowResize() {
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